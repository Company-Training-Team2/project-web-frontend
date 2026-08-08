"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AiPlannerHeader from "./AiPlannerHeader";
import LiveDossierHeading from "./LiveDossierHeading";
import ChatBubble from "./ChatBubble";
import AiMessageText from "./AiMessageText";
import BudgetHealthCard from "./BudgetHealthCard";
import RecommendationCard from "./RecommendationCard";
import QuoteCallout from "./QuoteCallout";
import InlineEventCard from "./InlineEventCard";
import QuickActionPills from "./QuickActionPills";
import ChatComposer from "./ChatComposer";
import { useAuth } from "@/context/AuthContext";
import { MOCK_PLANNER_CONVERSATION, PlannerMessage, QUICK_ACTION_REPLIES } from "@/lib/mock/aiPlannerScript";
import { sendAiChatMessage } from "@/services/ai.service";

const CONVERSATION_STORAGE_KEY = "ai-planner-conversation-id";

// No useRequireAuth here — a guest can open the AI Planner and read the
// existing dossier. An account is only required the moment they actually
// try to talk to it (send a message or tap a quick action), gated below.
export default function AiPlannerScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<PlannerMessage[]>(MOCK_PLANNER_CONVERSATION);
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(CONVERSATION_STORAGE_KEY) : null
  );

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

  // Talks to the real AI service (ai-service/, POST /api/ai/chat). Falls
  // back to a canned reply if the service is unreachable — same pattern as
  // vendor.service.ts falling back to mock fixtures — so the screen stays
  // usable in demos/offline even without the Python service running.
  const sendToAssistant = async (text: string, fallbackReply: string) => {
    appendUserMessage(text);
    setIsSending(true);
    try {
      const { reply, conversationId: newConversationId } = await sendAiChatMessage(text, conversationId);
      setConversationId(newConversationId);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(CONVERSATION_STORAGE_KEY, newConversationId);
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

      <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 overflow-y-auto px-4 pb-4 pt-4 sm:px-5 lg:px-10">
        <LiveDossierHeading eventName="The Tuscan Dream" />

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

        <div>
          <h3 className="mb-2 font-serif text-[16px] font-bold text-[#252323]">Curated Recommendations</h3>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <QuickActionPills onSelect={handleQuickAction} />
        <ChatComposer onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}
