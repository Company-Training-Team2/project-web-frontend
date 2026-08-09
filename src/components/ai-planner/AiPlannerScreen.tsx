"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AiPlannerHeader from "./AiPlannerHeader";
import ChatBubble from "./ChatBubble";
import AiMessageText from "./AiMessageText";
import BudgetHealthCard from "./BudgetHealthCard";
import RecommendationCard from "./RecommendationCard";
import QuoteCallout from "./QuoteCallout";
import InlineEventCard from "./InlineEventCard";
import QuickActionPills from "./QuickActionPills";
import ChatComposer from "./ChatComposer";
import { useAuth } from "@/context/AuthContext";
import { PlannerMessage, QUICK_ACTION_REPLIES } from "@/lib/mock/aiPlannerScript";
import { AiChatHistory, sendAiChatMessage } from "@/services/ai.service";

const HISTORY_STORAGE_KEY = "ai-planner-history";

function loadStoredHistory(): AiChatHistory | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AiChatHistory) : null;
  } catch {
    return null;
  }
}

// No useRequireAuth here — a guest can open the AI Planner screen itself.
// An account is only required the moment they actually try to talk to it
// (send a message or tap a quick action), gated below.
export default function AiPlannerScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // Starts empty — no scripted/mock conversation. The first thing in here
  // is whatever the customer actually says and the AI's real reply to it.
  const [messages, setMessages] = useState<PlannerMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  // The AI backend is stateless (no database) — this is the full running
  // transcript it handed back last time, resent on every call so it can
  // pick the conversation back up. See services/ai.service.ts.
  const [history, setHistory] = useState<AiChatHistory | null>(loadStoredHistory);

  const requireAuthOrRedirect = () => {
    if (isAuthenticated) return true;
    router.push("/login?redirect=/ai-planner");
    return false;
  };

  const appendUserMessage = (userText: string) => {
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", kind: "text", text: userText }]);
  };

  const appendAssistantMessage = (replyText: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: "assistant", kind: "text", text: replyText },
    ]);
  };

  // Talks to the real AI backend (POST /api/ai/chat, same-origin). Falls
  // back to a canned reply if it's unreachable — same pattern as
  // vendor.service.ts falling back to mock fixtures — so the screen stays
  // usable in demos/offline even without the AI function configured.
  const sendToAssistant = async (text: string, fallbackReply: string) => {
    appendUserMessage(text);
    setIsSending(true);
    try {
      const { reply, history: updatedHistory } = await sendAiChatMessage(text, history);
      setHistory(updatedHistory);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      }
      appendAssistantMessage(reply);
    } catch {
      appendAssistantMessage(fallbackReply);
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (!requireAuthOrRedirect()) return;
    void sendToAssistant(action, QUICK_ACTION_REPLIES[action] ?? "Noted — updating your plan now.");
  };

  const handleSend = (text: string) => {
    if (!requireAuthOrRedirect()) return;
    void sendToAssistant(text, "Got it — I'll factor that into your event dossier and follow up shortly.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f1ea]">
      <AiPlannerHeader />

      <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 overflow-y-auto px-4 pb-4 pt-4 sm:px-5 lg:max-w-4xl lg:px-10 xl:max-w-5xl 2xl:max-w-6xl">
        {messages.length === 0 && !isSending ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center text-[#a79a90]">
            <p className="font-serif text-[20px] font-bold text-[#252323]">Plan your event</p>
            <p className="max-w-xs text-[14px]">
              Tell me what you&apos;re celebrating — event type, city, guest count, and budget — and I&apos;ll put
              a plan together.
            </p>
          </div>
        ) : null}

        {messages.map((message) => (
          <ChatBubble key={message.id} role={message.role}>
            {message.kind === "text" ? <AiMessageText text={message.text ?? ""} /> : null}
            {message.kind === "budgetHealth" && message.budget ? (
              <BudgetHealthCard {...message.budget} />
            ) : null}
            {message.kind === "recommendation" && message.recommendation ? (
              <RecommendationCard {...message.recommendation} />
            ) : null}
            {message.kind === "quote" ? <QuoteCallout text={message.text ?? ""} /> : null}
            {message.kind === "eventCard" && message.eventCard ? (
              <InlineEventCard {...message.eventCard} />
            ) : null}
          </ChatBubble>
        ))}

        {isSending ? (
          <ChatBubble role="assistant">
            <span className="inline-flex items-center gap-1 text-[#a79a90]">
              <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-current" />
            </span>
          </ChatBubble>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <QuickActionPills onSelect={handleQuickAction} />
        <ChatComposer onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}
