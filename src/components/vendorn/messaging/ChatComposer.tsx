"use client";

import { useState } from "react";
import { Plus, Smile, Send } from "lucide-react";
import { QUICK_REPLY_ACTIONS } from "@/lib/mock/vendorMessagingScript";

export default function ChatComposer({
  onSend,
  onQuickAction,
}: {
  onSend: (text: string) => void;
  onQuickAction: (action: string) => void;
}) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="border-t border-[#DCCFC0] bg-[#F6ECE0]">
      <div className="flex gap-2 overflow-x-auto px-3 md:px-4 pt-3 pb-1">
        {QUICK_REPLY_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => onQuickAction(action)}
            className="shrink-0 rounded-full border border-[#DCCFC0] bg-white px-3 py-1.5 text-xs font-medium text-[#2B2622] hover:bg-[#EDE0D2] whitespace-nowrap"
          >
            {action}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 md:px-4 py-3">
        <button className="text-[#8B716A] hover:text-[#2B2622] shrink-0" aria-label="Attach">
          <Plus size={20} />
        </button>
        <div className="flex-1 flex items-center gap-2 rounded-full border border-[#DCCFC0] bg-white px-4 py-2 min-w-0">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Craft your message..."
            className="w-full min-w-0 bg-transparent text-sm outline-none text-[#2B2622] placeholder:text-[#8B716A]"
          />
          <Smile size={17} className="text-[#8B716A] shrink-0" />
        </div>
        <button
          onClick={submit}
          className="shrink-0 flex items-center justify-center size-9 rounded-full bg-[#A3391C] text-white hover:opacity-90"
          aria-label="Send"
        >
          <Send size={15} />
        </button>
      </div>

      <p className="px-3 md:px-4 pb-2 text-[10px] text-[#8B7E72]">
        Preview only — messaging isn&apos;t connected to a backend yet, nothing here is actually sent.
      </p>
    </div>
  );
}
