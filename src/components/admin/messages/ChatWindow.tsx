"use client";

import { useState } from "react";
import {
  Video,
  Phone,
  MoreVertical,
  Plus,
  Smile,
  Send,
  FileText,
  Download,
} from "lucide-react";

type Message = {
  id: string;
  from: "them" | "me";
  text?: string;
  time: string;
  file?: { name: string; meta: string };
};

const messages: Message[] = [
  {
    id: "1",
    from: "them",
    time: "08:12 AM",
    text: "Good morning, team! We've been looking at the floral arrangements you sent over. We absolutely love the palette, but were wondering if we could introduce a bit more deep terracotta to match the velvet drapes in the ballroom?",
  },
  {
    id: "2",
    from: "me",
    time: "09:45 AM",
    text: "Hello Amara! That is an excellent suggestion. The terracotta will create a wonderful bridge between the florals and the venue's architecture. I'll update the mood board and share it here shortly.",
  },
  {
    id: "3",
    from: "them",
    time: "10:02 AM",
    text: "That sounds perfect. Also, we just finalized the guest list for the rehearsal dinner. Attached it here!",
    file: { name: "Guest_List_Rehearsal.xlsx", meta: "42 KB · Excel Document" },
  },
];

const quickActions = ["Send Invoice", "Update Mood Board", "Schedule Call"];

export default function ChatWindow() {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCCFC0]">
        <div>
          <h2 className="font-serif font-semibold text-[#2B2622]">
            Amara Okonkwo
          </h2>
          <p className="text-xs text-[#8B716A] mt-0.5">
            Luxury Wedding Planning · May 24th, 2025
          </p>
        </div>

        <div className="flex items-center gap-4 text-[#8B716A]">
          <button className="hover:text-[#2B2622]">
            <Video size={17} />
          </button>
          <button className="hover:text-[#2B2622]">
            <Phone size={17} />
          </button>
          <button className="hover:text-[#2B2622]">
            <MoreVertical size={17} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FAF6F0]">
        <div className="flex justify-center">
          <span className="text-[10px] font-medium text-[#8B7E72] bg-[#EDE0D2] px-3 py-1 rounded-full">
            MONDAY, MARCH 18
          </span>
        </div>

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.from === "me" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-end gap-2 max-w-[85%] sm:max-w-md">
              {m.from === "them" && (
                <div className="w-8 h-8 rounded-full bg-[#DCCFC0] shrink-0" />
              )}

              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.from === "me"
                    ? "bg-[#2B2622] text-white rounded-br-sm"
                    : "bg-white border border-[#DCCFC0] text-[#2B2622] rounded-bl-sm"
                }`}
              >
                {m.text && <p>{m.text}</p>}

                {m.file && (
                  <div className="flex items-center gap-3 mt-3 bg-[#F6ECE0] rounded-xl p-3">
                    <FileText size={18} className="text-[#A3391C] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-[#2B2622] truncate">
                        {m.file.name}
                      </p>
                      <p className="text-[10px] text-[#8B716A]">
                        {m.file.meta}
                      </p>
                    </div>
                    <Download size={15} className="text-[#8B716A] shrink-0" />
                  </div>
                )}
              </div>

              {m.from === "me" && (
                <div className="w-6 h-6 rounded-full bg-[#A3391C] text-white text-[10px] flex items-center justify-center shrink-0 font-semibold">
                  EH
                </div>
              )}
            </div>

            <span className="text-[10px] text-[#8B7E72] mt-1 px-10">
              {m.time}
            </span>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-2 px-5 py-2 border-t border-[#DCCFC0] overflow-x-auto no-scrollbar">
        {quickActions.map((a) => (
          <button
            key={a}
            className="text-xs font-medium border border-[#DCCFC0] rounded-full px-3 py-1.5 text-[#2B2622] hover:bg-[#EDE0D2] whitespace-nowrap shrink-0"
          >
            {a}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-[#DCCFC0]">
        <button className="text-[#8B716A] hover:text-[#2B2622] shrink-0">
          <Plus size={20} />
        </button>

        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Craft your message..."
          className="flex-1 outline-none text-sm bg-transparent text-[#2B2622] placeholder:text-[#8B716A] min-w-0"
        />

        <button className="text-[#8B716A] hover:text-[#2B2622] shrink-0">
          <Smile size={18} />
        </button>

        <button className="bg-[#A3391C] text-white w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 shrink-0">
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}