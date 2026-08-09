"""
Shared business logic for the EventHub AI Planning Assistant, imported by
the Vercel Python functions under api/ai/ and api/health.py.

Fully stateless by design: no database, no Redis. Vercel Python Functions
can land on a different short-lived instance per request, so any state
kept in a process-level dict (the original hand-off's approach) or even an
external store just adds a moving part for no reason here — instead, the
caller (the Next.js frontend) round-trips the full message history on
every request, the same way any stateless chat API works. `adjust_allocation`
recovers the last budget breakdown for a given eventId by scanning back
through that same history for the tool result that produced it, rather
than looking it up in a store.
"""
import json
import logging
import os
import time
from pathlib import Path

import requests
from dotenv import load_dotenv
from openai import OpenAI

logger = logging.getLogger("eventhub-ai")

# ---------------------------------------------------------------------
# Config — all from environment variables. In production these are set in
# Vercel → Project Settings → Environment Variables (load_dotenv() is a
# no-op there, nothing to find). Locally (`vercel dev`, or a standalone
# `uvicorn api.ai.chat:app`), this loads front-end/.env.
# ---------------------------------------------------------------------
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")

MODEL_NAME = os.environ.get(
    "MODEL_NAME",
    "qwen/qwen3-235b-a22b-2507"
)

# Root of the EventHub .NET API, e.g. https://eventhub-backend-api.runasp.net
# (no trailing /api — that's appended per-call below).
BACKEND_BASE_URL = os.environ.get(
    "BACKEND_BASE_URL",
    "http://localhost:5006"
).rstrip("/")

_client = None


def get_openai_client() -> OpenAI:
    global _client
    if _client is None:
        if not OPENROUTER_API_KEY:
            raise RuntimeError(
                "OPENROUTER_API_KEY is not set. Add it in Vercel → Project "
                "Settings → Environment Variables (or front-end/.env for "
                "local dev)."
            )
        _client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=OPENROUTER_API_KEY,
        )
    return _client


# ---------------------------------------------------------------------
# Budget logic — unchanged from the original hand-off.
# ---------------------------------------------------------------------
DEFAULT_PROFILE = {
    "Venue": 40,
    "Catering": 25,
    "Photography": 15,
    "Entertainment": 10,
    "Decoration": 10,
}

BASELINE_PROFILES = {
    "Wedding": {
        "Venue": 35,
        "Catering": 30,
        "Photography": 10,
        "Entertainment": 7,
        "Decoration": 8,
        "MakeupArtist": 10,
    },
    "Engagement": {
        "Venue": 40,
        "Catering": 20,
        "Photography": 15,
        "Entertainment": 15,
        "Decoration": 10,
    },
    "Birthday": {
        "Venue": 30,
        "Catering": 25,
        "Photography": 10,
        "Entertainment": 20,
        "Decoration": 10,
        "Projector": 5
    },
    "Corporate": {
        "Venue": 40,
        "Catering": 25,
        "Photography": 10,
        "Other": 20,
        "Projector": 5
    }
}


# ---------------------------------------------------------------------
# Vendors — talks to the real EventHub backend.
#
# The backend has no `/api/vendors` endpoint (that was assumed by the
# original draft of this script). The real, public, unauthenticated search
# endpoint is `GET /api/workposts/search` (see
# back-end/EventHub.API/Controllers/WorkPostController.cs), which returns
# WorkPostSummaryDto items — `categoryName` instead of `category`, plus a
# few fields this service doesn't need. get_vendors() adapts the shape so
# the rest of this file (written against the old `category`/`price` shape)
# doesn't have to change.
# ---------------------------------------------------------------------
def get_vendors(city: str):
    vendors = []
    page = 1
    page_size = 100

    while True:
        resp = requests.get(
            f"{BACKEND_BASE_URL}/api/workposts/search",
            params={"city": city, "page": page, "pageSize": page_size},
            timeout=15
        )
        resp.raise_for_status()

        data = resp.json()
        items = data.get("items", data) if isinstance(data, dict) else data

        vendors.extend(
            {
                "id": item.get("id"),
                "category": item.get("categoryName"),
                "price": item.get("price"),
                "title": item.get("title"),
                "vendorBusinessName": item.get("vendorBusinessName"),
                "city": item.get("city"),
                "imageUrl": item.get("primaryImageUrl"),
                "rating": item.get("averageRating"),
                "reviewCount": item.get("reviewCount"),
            }
            for item in items
        )

        if len(items) < page_size:
            break
        page += 1

    return vendors


def pick_best_vendor(vendors, category, target_budget):
    category_vendors = [v for v in vendors if v["category"] == category]
    if not category_vendors:
        return None
    return min(category_vendors, key=lambda x: abs(x["price"] - target_budget))


def calculate_budget_split(event_type, total_budget, wanted_categories):
    if total_budget <= 0:
        raise ValueError("total_budget must be greater than zero")

    profile = BASELINE_PROFILES.get(event_type, DEFAULT_PROFILE)

    selected = {c: profile[c] for c in wanted_categories if c in profile}
    if not selected:
        selected = dict(profile)

    total_weight = sum(selected.values())
    result = []
    for category, weight in selected.items():
        percentage = round(weight / total_weight * 100, 1)
        amount = round(total_budget * percentage / 100)
        result.append({"category": category, "percentage": percentage, "amount": amount})
    return result


def get_budget_recommendation(event_type: str, city: str, guest_count: int, total_budget: float, wanted_categories: list, **_ignored):
    vendors = get_vendors(city)
    split = calculate_budget_split(event_type, total_budget, wanted_categories)

    categories = []
    for item in split:
        vendor = pick_best_vendor(vendors, item["category"], item["amount"])
        categories.append({
            "category": item["category"],
            "percentage": item["percentage"],
            "amount": item["amount"],
            "suggestedVendor": vendor
        })

    # This eventId only has to be unique within a single conversation's
    # history (adjust_allocation looks it up by scanning that same history
    # back), so a millisecond timestamp is enough — no uuid/database needed.
    event_id = f"draft-{int(time.time() * 1000) % 100000000:x}"

    return {
        "eventId": event_id,
        "currency": "EGP",
        "city": city,
        "totalBudget": total_budget,
        "categories": categories
    }


def _find_draft_event(messages: list, event_id: str):
    """No database: the eventId's last known state is already sitting in
    this conversation's own history, inside the tool-result message that
    get_budget_recommendation (or a prior adjust_allocation) produced.
    Scan backward for the most recent one."""
    for msg in reversed(messages):
        if msg.get("role") != "tool":
            continue
        try:
            content = json.loads(msg.get("content") or "{}")
        except (TypeError, ValueError):
            continue
        if content.get("eventId") == event_id and "categories" in content:
            return content
    return None


def adjust_allocation(messages: list, event_id: str, category_adjustments: list, **_ignored):
    state = _find_draft_event(messages, event_id)

    if not state:
        return {"error": "event not found"}

    current = {c["category"]: c["percentage"] for c in state["categories"]}

    for adj in category_adjustments:
        current[adj["category"]] = adj["newPercentage"]

    fixed = {a["category"] for a in category_adjustments}
    fixed_sum = sum(current[c] for c in fixed)
    remaining = [c for c in current if c not in fixed]
    remaining_budget = max(0, 100 - fixed_sum)
    old_sum = sum(current[c] for c in remaining) or 1

    for c in remaining:
        current[c] = round(current[c] / old_sum * remaining_budget, 1)

    vendors = get_vendors(state["city"])

    new_categories = []
    for category, percentage in current.items():
        amount = round(state["totalBudget"] * percentage / 100)
        vendor = pick_best_vendor(vendors, category, amount)
        new_categories.append({
            "category": category,
            "percentage": percentage,
            "amount": amount,
            "suggestedVendor": vendor
        })

    return {
        "eventId": event_id,
        "currency": "EGP",
        "city": state["city"],
        "totalBudget": state["totalBudget"],
        "categories": new_categories
    }


# ---------------------------------------------------------------------
# Tool declarations for the model.
# ---------------------------------------------------------------------
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_budget_recommendation",
            "description": (
                "استدعِ هذه الدالة فقط بعد ما تجمع من العميل: نوع المناسبة، "
                "المدينة أو المحافظة، عدد الأفراد، الميزانية الإجمالية، "
                "وقائمة الخدمات المطلوبة."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "event_type": {
                        "type": "string",
                        "enum": ["Wedding", "Engagement", "Birthday", "Corporate"]
                    },
                    "city": {
                        "type": "string",
                        "description": "مثال: Alexandria, Cairo"
                    },
                    "guest_count": {"type": "integer"},
                    "total_budget": {"type": "number"},
                    "wanted_categories": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "Venue", "Catering", "Photography", "Entertainment",
                                "Decoration", "Other", "MakeupArtist", "Projector"
                            ]
                        },
                        "description": "الخدمات المطلوبة"
                    }
                },
                "required": ["event_type", "city", "guest_count", "total_budget", "wanted_categories"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "adjust_allocation",
            "description": (
                "استدعِ هذه الدالة عندما يطلب العميل تعديل توزيع الميزانية "
                "بعد ظهور التوصية الأولى."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "event_id": {"type": "string"},
                    "category_adjustments": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "category": {"type": "string"},
                                "newPercentage": {"type": "number"}
                            },
                            "required": ["category", "newPercentage"]
                        }
                    }
                },
                "required": ["event_id", "category_adjustments"]
            }
        }
    }
]

SYSTEM_INSTRUCTION = """
You are an intelligent event-planning assistant for the EventHub platform.

Language behavior:
- Detect the user's language automatically and respond in the same language.
- If the user speaks Egyptian Arabic, respond in Egyptian Arabic.
- If the user speaks Modern Standard Arabic, respond in Arabic.
- If the user speaks English, respond in English.
- Keep responses friendly, professional, and concise.
- Do not switch languages unless the user does.

Your task is to help the customer plan an event even if no event has been created yet in the system.

Ask the following questions ONE AT A TIME (never ask multiple questions in the same message):

1. Event type (Wedding / Engagement / Birthday / Corporate Event)
2. City or Governorate
3. Expected number of attendees
4. Total budget (in EGP)

After collecting the event type, city, guest count, and total budget:

Some services are considered mandatory by default and should be automatically included in the planning process without asking the user.

Mandatory services:

For Wedding:
- Venue
- Decoration
- Catering

For Engagement:
- Venue
- Decoration

For Birthday:
- Venue

For Corporate Event:
- Venue

Do NOT ask the user whether they need mandatory services.
Assume they are required and automatically include them in wanted_categories.

For optional services, ask one short yes/no question at a time before moving to the next service.

Optional services:

Wedding / Engagement:
- Photography
- DJ / Band
- Makeup Artist

Birthday:
- Catering
- Photography
- Entertainment
- DJ

Corporate Event:
- Catering
- Photography
- Other
- Projector

When calling get_budget_recommendation,
always include the mandatory services automatically in wanted_categories.

Examples:
- "Do you need catering?"
- "Do you need photography?"
- "Do you need a DJ or live band?"

Only ask about optional services.
Never ask about mandatory services.

Examples:
- Arabic: "محتاج قاعة؟"
- Arabic: "عايز تصوير؟"
- English: "Do you need a venue?"
- English: "Do you need photography?"

After collecting all required information, call:
get_budget_recommendation

When the tool returns results, display each selected service in this format:

- Service Name
- Recommended Vendor
- Price (EGP)
- Image URL displayed as a Markdown image

Then show:
- Total Cost

And finish with:

Arabic:
"تحب تزود أو تقلل في حاجة معينة؟"

English:
"Would you like to increase or reduce anything in the plan?"

If the customer requests changes, call:
adjust_allocation

using the eventId received previously, then display the updated results using the same format.

انت مساعد ذكي لتخطيط المناسبات في منصة EventHub، بتتكلم باللهجة المصرية بشكل ودود ومختصر.

مهمتك إنك تساعد العميل يخطط لمناسبته من غير ما يكون عنده أي Event متعمل مسبقًا في النظام.

اسأل العميل الأسئلة دي **واحد في كل مرة** (متسألش كل حاجة مرة واحدة):
1. نوع المناسبة (فرح / خطوبة / عيد ميلاد / مناسبة شركات)
2. المحافظة أو المدينة
3. عدد الأفراد المتوقع
4. الميزانية الإجمالية بالجنيه المصري

بعد كده اسأله عن الخدمات اللي فعلاً عايزها، حسب نوع المناسبة، من المرجع ده:
- فرح / خطوبة / عيد ميلاد: قاعة، ضيافة، تصوير، دي جي/فرقة، ديكور
- مناسبة شركات: قاعة، ضيافة، تصوير، بنود أخرى (تجهيزات تقنية)
اسأل عن كل خدمة بسؤال قصير ("عايز مصور؟") قبل ما تكمل للي بعدها.

لما تجمع كل البيانات دي، استدعِ get_budget_recommendation.

لما ترجعلك النتيجة، اعرضها للعميل بالشكل ده بالظبط لكل خدمة:
- اسم الخدمة، اسم الفيندور المقترح، السعر بالجنيه، وحط رابط الصورة كـ Markdown image ![]().
في الآخر اكتب التكلفة الإجمالية، واقفل بسؤال: "تحب تزود أو تقلل في حاجة معينة؟"

لو العميل طلب تعديل، استدعِ adjust_allocation بالـ eventId اللي جالك قبل كده، واعرض النتيجة الجديدة بنفس الشكل.
"""


def dispatch_function_call(name: str, args: dict, messages: list) -> dict:
    if name == "get_budget_recommendation":
        return get_budget_recommendation(**args)
    if name == "adjust_allocation":
        return adjust_allocation(messages, **args)
    return {"error": f"unknown function: {name}"}


def _system_message():
    return {"role": "system", "content": SYSTEM_INSTRUCTION}


def send_and_handle(history: list, user_text: str) -> tuple[str, list]:
    """`history` is exactly what this function returned to the caller last
    time (or [] / None on the first message of a conversation) — the
    caller (the Next.js frontend) is the only place this state lives.
    Returns (reply_text, updated_history) for the caller to store and send
    back on the next turn."""
    client = get_openai_client()

    messages = list(history) if history else [_system_message()]
    messages.append({"role": "user", "content": user_text})

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )

    assistant_message = response.choices[0].message

    if assistant_message.tool_calls:
        # `.model_dump()` (not the raw SDK object) so this list stays
        # plain JSON the frontend can store (sessionStorage) and replay.
        messages.append(assistant_message.model_dump(exclude_none=True))

        for tool_call in assistant_message.tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            logger.info("tool call: %s(%s)", function_name, function_args)

            result = dispatch_function_call(function_name, function_args, messages)

            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result, ensure_ascii=False)
            })

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        final_answer = response.choices[0].message.content
        messages.append({"role": "assistant", "content": final_answer})
        return final_answer, messages

    answer = assistant_message.content
    messages.append({"role": "assistant", "content": answer})
    return answer, messages
