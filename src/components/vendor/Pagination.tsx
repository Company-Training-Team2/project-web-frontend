"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
}) {
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 px-4 pb-10 sm:px-8">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        aria-label="Previous page"
        className="grid size-8 place-items-center rounded-full border border-[#e5ded2] text-[#6d5d54]"
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "grid size-8 place-items-center rounded-full border text-[13px] font-medium",
            p === page ? "border-[#af3718] bg-[#af3718] text-white" : "border-[#e5ded2] text-[#252323]"
          )}
        >
          {p}
        </button>
      ))}
      {totalPages > 3 ? <span className="text-[#a79a90]">…</span> : null}
      {totalPages > 3 ? (
        <button
          onClick={() => onChange(totalPages)}
          className="grid size-8 place-items-center rounded-full border border-[#e5ded2] text-[13px] font-medium text-[#252323]"
        >
          {totalPages}
        </button>
      ) : null}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        aria-label="Next page"
        className="grid size-8 place-items-center rounded-full border border-[#e5ded2] text-[#6d5d54]"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
