"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";

// UI-only demo composer — appends the next canned reply; no LLM call.
export default function ChatComposer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 border-t border-[#e5ded2] bg-white px-4 py-3 lg:px-10">
      <button aria-label="Add attachment" className="grid size-9 shrink-0 place-items-center rounded-full text-[#a79a90]">
        <Plus className="size-4" />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask your planner..."
        className="h-11 flex-1 rounded-full border border-[#e5ded2] bg-[#f6f1ea] px-4 text-[14px] placeholder:text-[#a79a90] focus:outline-none"
      />
      <button
        onClick={handleSend}
        aria-label="Send"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-[#af3718] text-white"
      >
        <Send className="size-4" />
      </button>
    </div>
  );
}
