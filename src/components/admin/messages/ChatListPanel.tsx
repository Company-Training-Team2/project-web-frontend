"use client";

import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { AdminConversationDto } from "@/services/admin.service";

function initials(name: string) {
  return name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function relativeDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ChatListPanel({
  conversations,
  isLoading,
  activeId,
  onSelect,
  onNew,
}: {
  conversations: AdminConversationDto[];
  isLoading: boolean;
  activeId: number | null;
  onSelect: (id: number) => void;
  onNew: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.subject.toLowerCase().includes(q) ||
        c.userEmail.toLowerCase().includes(q) ||
        (c.userDisplayName ?? "").toLowerCase().includes(q)
    );
  }, [conversations, search]);

  return (
    <div className="w-full md:w-72 border-r border-[#DCCFC0] bg-[#F6ECE0] flex flex-col shrink-0">
      <div className="p-4 border-b border-[#DCCFC0]">
        <div className="flex items-center gap-2 rounded-lg border border-[#DCCFC0] bg-white px-3 py-2">
          <Search size={14} className="text-[#8B716A]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-semibold text-[#8B7E72] uppercase tracking-wide">
          Conversations
        </span>
        <button onClick={onNew} className="flex items-center gap-1 text-[#A3391C] hover:text-[#8a2f16]" title="New conversation">
          <Plus size={14} />
          <span className="text-xs font-medium">New</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-1 p-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-[#DCCFC0]/40" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-[#8B7E72]">
            {conversations.length === 0 ? "No conversations yet." : "No matches."}
          </p>
        ) : (
          filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left px-4 py-3 border-l-2 transition
                ${activeId === c.id ? "bg-[#EDE0D2] border-[#A3391C]" : "border-transparent hover:bg-[#EDE0D2]"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#DCCFC0] shrink-0 grid place-items-center text-[11px] font-semibold text-[#5A4E43]">
                  {initials(c.userDisplayName || c.userEmail)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-sm text-[#2B2622] truncate">
                      {c.userDisplayName || c.userEmail}
                    </h3>
                    <span className="text-[10px] text-[#8B7E72] shrink-0">{relativeDate(c.updatedAt)}</span>
                  </div>
                  <p className="text-xs text-[#8B716A] truncate">{c.subject}</p>
                  <p className="text-xs text-[#8B7E72] truncate mt-1">
                    {c.lastMessageSnippet || "No messages yet."}
                  </p>
                </div>

                {c.unreadCount > 0 && (
                  <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-[#A3391C] text-[9px] font-bold text-white">
                    {c.unreadCount}
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
