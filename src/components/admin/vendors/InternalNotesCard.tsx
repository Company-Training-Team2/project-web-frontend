"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function InternalNotesCard() {
  const [note, setNote] = useState("");

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-white p-5">
      <h3 className="font-serif text-base font-bold text-[#2B2622]">Internal Notes</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add administrative notes..."
        rows={3}
        className="mt-2 w-full resize-none rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] p-3 text-sm outline-none focus:border-[#A3391C]"
      />
      <div className="mt-2 flex items-center justify-between text-[12px] text-[#8B716A]">
        <span>Only visible to Admins</span>
        <button
          onClick={() => toast.success("Note saved.")}
          className="font-bold text-[#A3391C] hover:underline"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
