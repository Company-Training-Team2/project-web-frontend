"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatComposer({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="border-t border-[#DCCFC0] bg-[#F6ECE0]">
      <div className="flex items-center gap-2 px-3 md:px-4 py-3">
        <div className="flex-1 flex items-center gap-2 rounded-full border border-[#DCCFC0] bg-white px-4 py-2 min-w-0">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Write a message..."
            className="w-full min-w-0 bg-transparent text-sm outline-none text-[#2B2622] placeholder:text-[#8B716A]"
          />
        </div>
        <button
          onClick={submit}
          disabled={!text.trim()}
          className="shrink-0 flex items-center justify-center size-9 rounded-full bg-[#A3391C] text-white hover:opacity-90 disabled:opacity-40"
          aria-label="Send"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
