"use client";

import { Check } from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";

interface CategoryChipSelectProps {
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}

/** Multi-select category chips for VendorRegisterWizard Step 2 ("Primary
 * Categories — Select up to 3"). */
export default function CategoryChipSelect({ selected, onChange, max = 3 }: CategoryChipSelectProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {MOCK_CATEGORIES.map((category) => {
        const isSelected = selected.includes(category.id);
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => toggle(category.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition",
              isSelected
                ? "border-[#af3718] bg-[#af3718] text-white"
                : "border-[#ded8d2] bg-white text-[#252323] hover:border-[#af3718]"
            )}
          >
            {isSelected ? <Check className="size-3.5" /> : null}
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
