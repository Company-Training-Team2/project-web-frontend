"use client";

import { useEffect, useRef } from "react";
import { Conversation, ConversationMessage } from "@/services/messaging.service";

export default function ChatThread({
  conversation,
  messages,
  status,
}: {
  conversation: Conversation;
  messages: ConversationMessage[];
  status: "loading" | "error" | "ready";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  return (
    <div className="flex h-full flex-col min-w-0">
      <div className="flex items-center justify-between gap-3 border-b border-[#DCCFC0] px-4 py-3">
        <div className="min-w-0">
          <h2 className="font-serif font-bold text-[#2B2622] truncate">{conversation.otherPartyName}</h2>
          {conversation.workPostTitle ? (
            <p className="text-xs text-[#8B7E72] truncate">{conversation.workPostTitle}</p>
          ) : null}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 md:px-5 py-4 space-y-4">
        {status === "loading" ? (
          <p className="text-center text-sm text-[#8B7E72]">Loading…</p>
        ) : status === "error" ? (
          <p className="text-center text-sm text-[#8a3b3b]">Couldn&apos;t load this conversation.</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-[#8B7E72]">No messages yet — say hello below.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.isFromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] sm:max-w-[70%] ${m.isFromMe ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    m.isFromMe
                      ? "bg-[#2B2622] text-white rounded-br-sm"
                      : "bg-white border border-[#DCCFC0] text-[#2B2622] rounded-bl-sm"
                  }`}
                >
                  {m.body}
                </div>
                <span className="text-[10px] text-[#8B7E72] mt-1 px-1">
                  {new Date(m.sentAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
