"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";

export default function ChatComposer({
  onSend,
  disabled = false,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
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
        disabled={disabled}
        className="h-11 flex-1 rounded-full border border-[#e5ded2] bg-[#f6f1ea] px-4 text-[14px] placeholder:text-[#a79a90] focus:outline-none disabled:opacity-60"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        aria-label="Send"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-[#af3718] text-white disabled:opacity-60"
      >
        <Send className="size-4" />
      </button>
    </div>
  );
}
