"use client";

import { useEffect, useRef, useState } from "react";
import { Send, MessageSquareOff } from "lucide-react";
import { AdminConversationDto, AdminConversationMessageDto } from "@/services/admin.service";

const STATUS_OPTIONS: Array<"Open" | "Resolved" | "Closed"> = ["Open", "Resolved", "Closed"];

const STATUS_STYLE: Record<string, string> = {
  Open: "bg-[#fdf0ec] text-[#af3718]",
  Resolved: "bg-[#eaf6ef] text-[#2E9E68]",
  Closed: "bg-[#EDE0D2] text-[#8B716A]",
};

export default function ChatWindow({
  conversation,
  messages,
  status,
  onSend,
  onStatusChange,
}: {
  conversation: AdminConversationDto | null;
  messages: AdminConversationMessageDto[];
  status: "idle" | "loading" | "error" | "ready";
  onSend: (body: string) => void;
  onStatusChange: (status: "Open" | "Resolved" | "Closed") => void;
}) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    const body = draft.trim();
    if (!body) return;
    onSend(body);
    setDraft("");
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 min-w-0 bg-white text-[#8B716A]">
        <MessageSquareOff size={28} />
        <p className="text-sm">Select a conversation to view it here.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCCFC0]">
        <div className="min-w-0">
          <h2 className="font-serif font-semibold text-[#2B2622] truncate">{conversation.subject}</h2>
          <p className="text-xs text-[#8B716A] mt-0.5 truncate">
            {conversation.userDisplayName || conversation.userEmail}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                conversation.status === s ? STATUS_STYLE[s] : "text-[#8B716A] hover:bg-[#F6ECE0]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FAF6F0]">
        {status === "loading" ? (
          <p className="text-center text-sm text-[#8B7E72]">Loading…</p>
        ) : status === "error" ? (
          <p className="text-center text-sm text-[#8a3b3b]">Couldn&apos;t load this conversation.</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-[#8B7E72]">No messages yet — say hello below.</p>
        ) : (
          messages.map((m) => {
            const fromAdmin = m.senderUserId == null;
            return (
              <div key={m.id} className={`flex flex-col ${fromAdmin ? "items-end" : "items-start"}`}>
                <div className="flex items-end gap-2 max-w-[85%] sm:max-w-md">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      fromAdmin
                        ? "bg-[#2B2622] text-white rounded-br-sm"
                        : "bg-white border border-[#DCCFC0] text-[#2B2622] rounded-bl-sm"
                    }`}
                  >
                    {m.body}
                  </div>
                </div>
                <span className="text-[10px] text-[#8B7E72] mt-1 px-1">
                  {new Date(m.sentAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-[#DCCFC0]">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Reply to this conversation..."
          className="flex-1 outline-none text-sm bg-transparent text-[#2B2622] placeholder:text-[#8B716A] min-w-0"
        />
        <button
          onClick={handleSend}
          disabled={!draft.trim()}
          className="bg-[#A3391C] text-white w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 shrink-0 disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
