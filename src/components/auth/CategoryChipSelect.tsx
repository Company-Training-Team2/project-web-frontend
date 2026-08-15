"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { categoriesService, type Category } from "@/services/categories.service";
import { cn } from "@/lib/utils";

interface CategoryChipSelectProps {
  /** Selected category ids, as strings (form state elsewhere is string-based). */
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}

/** Multi-select category chips for VendorRegisterWizard Step 2 ("Which
 * services do you offer? — choose up to 3"). Backed by the real
 * GET /api/categories endpoint so the ids submitted at registration match
 * real Category rows (see RegisterRequest.CategoryIds / AuthService). */
export default function CategoryChipSelect({ selected, onChange, max = 3 }: CategoryChipSelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    categoriesService
      .getAll()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-[13px] text-[#a79a90]">
        <Loader2 className="size-3.5 animate-spin" />
        Loading categories…
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const id = String(category.id);
        const isSelected = selected.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
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
