"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export type ChatPreview = {
  id: string;
  name: string;
  tag: string;
  date: string;
  lastMessage: string;
  unread?: boolean;
};

const chats: ChatPreview[] = [
  {
    id: "amara",
    name: "Amara Okonkwo",
    tag: "Wedding · May 2025",
    date: "10:24 AM",
    lastMessage: "The mood board looks incredible! We're leaning towards...",
    unread: true,
  },
  {
    id: "julian",
    name: "Julian Ross",
    tag: "Gala · Oct 2024",
    date: "Yesterday",
    lastMessage: "Can you confirm the final guest count by Monday?",
  },
  {
    id: "elena",
    name: "Elena Vance",
    tag: "Graduation Soiree",
    date: "Mar 12",
    lastMessage: "I've attached the dietary requirements for our guests.",
  },
];

export default function ChatListPanel({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");

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
          Active Chats
        </span>
        <button className="text-[#8B716A] hover:text-[#2B2622]">
          <SlidersHorizontal size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-4 py-3 border-l-2 transition
              ${
                activeId === c.id
                  ? "bg-[#EDE0D2] border-[#A3391C]"
                  : "border-transparent hover:bg-[#EDE0D2]"
              }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#DCCFC0] shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-sm text-[#2B2622] truncate">
                    {c.name}
                  </h3>
                  <span className="text-[10px] text-[#8B7E72] shrink-0">
                    {c.date}
                  </span>
                </div>
                <p className="text-xs text-[#8B716A] truncate">{c.tag}</p>
                <p className="text-xs text-[#8B7E72] truncate mt-1">
                  {c.lastMessage}
                </p>
              </div>

              {c.unread && (
                <span className="w-2 h-2 rounded-full bg-[#A3391C] mt-1 shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}