"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddTaskBar({ onAdd, isSubmitting }: { onAdd: (title: string) => void; isSubmitting: boolean }) {
  const [title, setTitle] = useState("");

  const submit = () => {
    const t = title.trim();
    if (!t) return;
    onAdd(t);
    setTitle("");
  };

  return (
    <div className="px-4 md:px-6 pt-4 flex items-center gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add a task..."
        className="flex-1 h-11 rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] px-4 text-sm outline-none focus:border-[#A3391C] placeholder:text-[#8B716A]"
      />
      <button
        onClick={submit}
        disabled={!title.trim() || isSubmitting}
        className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-[#A3391C] px-4 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        <Plus size={16} />
        Add
      </button>
    </div>
  );
}
