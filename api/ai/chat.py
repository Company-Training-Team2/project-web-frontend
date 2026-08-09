"""
Vercel Python Function — POST /api/ai/chat

Deployed in the same Vercel project as the Next.js frontend, so this is
same-origin from the browser's point of view (no CORS needed, unlike the
old standalone ai-service/). Fully stateless: no database, no in-memory
dict — the caller sends the conversation `history` it got back from the
previous call, and gets an updated `history` back to store for the next
one. See api/_lib/ai_core.py for the actual assistant logic.
"""
import logging
import sys
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# api/_lib is excluded from Vercel's routing (leading underscore) but is a
# plain sibling directory, not an installable package — add it to the path
# so `import ai_core` works both here and under `vercel dev`.
sys.path.append(str(Path(__file__).resolve().parent.parent / "_lib"))
import ai_core  # noqa: E402

logger = logging.getLogger("eventhub-ai")

app = FastAPI()


class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, Any]] | None = None


class ChatResponse(BaseModel):
    reply: str
    history: list[dict[str, Any]]


@app.post("/api/ai/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    try:
        reply, updated_history = ai_core.send_and_handle(req.history, req.message)
    except Exception:
        logger.exception("chat_endpoint failed")
        raise HTTPException(
            status_code=502,
            detail="AI assistant is temporarily unavailable. Please try again."
        )

    return ChatResponse(reply=reply, history=updated_history)
