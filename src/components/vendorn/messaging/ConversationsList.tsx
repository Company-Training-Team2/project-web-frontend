"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MockConversation } from "@/lib/mock/vendorMessagingScript";

export default function ConversationsList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: MockConversation[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = conversations.filter((c) =>
    c.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="p-3 md:p-4 border-b border-[#DCCFC0]">
        <h1 className="font-serif text-lg font-bold text-[#A3391C]">Inquiries &amp; Messages</h1>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-[#8B716A]">
          <Search size={14} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-transparent text-sm outline-none text-[#2B2622] placeholder:text-[#8B716A]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full flex items-start gap-3 px-3 md:px-4 py-3 text-left border-b border-[#DCCFC0]/60 ${
                isActive ? "bg-[#EDE0D2]" : "hover:bg-[#EDE0D2]/50"
              }`}
            >
              <div className="relative shrink-0">
                <div className="size-10 rounded-full bg-[#DCCFC0] flex items-center justify-center font-serif font-bold text-[#2B2622]">
                  {c.avatarInitial}
                </div>
                {c.unread && (
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-[#A3391C] border-2 border-[#F6ECE0]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#2B2622] truncate">{c.clientName}</p>
                  <span className="text-[10px] text-[#8B7E72] shrink-0">{c.lastMessageTime}</span>
                </div>
                <p className="text-xs text-[#A3391C] font-medium truncate">{c.eventType}</p>
                <p className="text-xs text-[#8B7E72] truncate mt-0.5">{c.lastMessagePreview}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
