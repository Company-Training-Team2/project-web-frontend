"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";

const CHIP_COLORS = [
  "bg-[#f7dede] text-[#8a3b3b]",
  "bg-[#dcece1] text-[#2f5c46]",
  "bg-[#f5e6c8] text-[#8a6b1f]",
  "bg-[#e4e0da] text-[#54493f]",
];

export default function VendorCategoriesCard({
  categories,
  onChange,
}: {
  categories: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const addCategory = () => {
    const name = draft.trim();
    if (!name) return;
    onChange([...categories, name]);
    setDraft("");
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
          <Tag size={18} className="text-[#A3391C]" />
          Vendor Categories
        </h3>
        {/* No CategoryController exists on the backend yet — this whole card is local-only. */}
        <button className="text-sm font-medium text-[#A3391C] hover:underline">Manage All →</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category, i) => (
          <span
            key={category}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
          >
            {category}
            <button
              aria-label={`Remove ${category}`}
              onClick={() => onChange(categories.filter((c) => c !== category))}
            >
              <X size={13} />
            </button>
          </span>
        ))}

        <div className="flex items-center gap-1.5 rounded-full border border-dashed border-[#DCCFC0] px-3 py-1.5 text-sm text-[#8B716A]">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
            placeholder="+ Add Category"
            className="w-28 bg-transparent outline-none placeholder:text-[#8B716A]"
          />
        </div>
      </div>
    </div>
  );
}
