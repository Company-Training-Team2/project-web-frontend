"use client";

import { useState } from "react";

import AiPlannerHeader from "./AiPlannerHeader";
import LiveDossierHeading from "./LiveDossierHeading";
import ChatBubble from "./ChatBubble";
import BudgetHealthCard from "./BudgetHealthCard";
import RecommendationCard from "./RecommendationCard";
import QuoteCallout from "./QuoteCallout";
import InlineEventCard from "./InlineEventCard";
import QuickActionPills from "./QuickActionPills";
import ChatComposer from "./ChatComposer";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { MOCK_PLANNER_CONVERSATION, PlannerMessage, QUICK_ACTION_REPLIES } from "@/lib/mock/aiPlannerScript";

export default function AiPlannerScreen() {
  useRequireAuth();
  const [messages, setMessages] = useState<PlannerMessage[]>(MOCK_PLANNER_CONVERSATION);

  const appendReply = (userText: string, replyText: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", kind: "text", text: userText },
      { id: `a-${Date.now()}`, role: "assistant", kind: "text", text: replyText },
    ]);
  };

  const handleQuickAction = (action: string) => {
    appendReply(action, QUICK_ACTION_REPLIES[action] ?? "Noted — updating your plan now.");
  };

  const handleSend = (text: string) => {
    appendReply(text, "Got it — I'll factor that into your event dossier and follow up shortly.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f1ea]">
      <AiPlannerHeader />

      <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4 pt-4 lg:px-10">
        <LiveDossierHeading eventName="The Tuscan Dream" />

        {messages.map((message) => (
          <ChatBubble key={message.id} role={message.role}>
            {message.kind === "text" ? message.text : null}
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

        <div>
          <h3 className="mb-2 font-serif text-[16px] font-bold text-[#252323]">Curated Recommendations</h3>
        </div>
      </div>

      <QuickActionPills onSelect={handleQuickAction} />
      <ChatComposer onSend={handleSend} />
    </div>
  );
}
