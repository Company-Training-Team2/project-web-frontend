"use client";

import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";

export default function CategoryPillFilter({
  active,
  onChange,
}: {
  active: string | null;
  onChange: (next: string | null) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1 lg:px-10">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition",
          active === null ? "border-[#af3718] bg-[#af3718] text-white" : "border-[#e5ded2] bg-white text-[#252323]"
        )}
      >
        All
      </button>
      {MOCK_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition",
            active === category.id
              ? "border-[#af3718] bg-[#af3718] text-white"
              : "border-[#e5ded2] bg-white text-[#252323]"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
