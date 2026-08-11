"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { categoriesService, Category } from "@/services/categories.service";

const CHIP_COLORS = [
  "bg-[#f7dede] text-[#8a3b3b]",
  "bg-[#dcece1] text-[#2f5c46]",
  "bg-[#f5e6c8] text-[#8a6b1f]",
  "bg-[#e4e0da] text-[#54493f]",
];

// Real, callable endpoint — GET /api/categories (CategoriesController). No
// create/update/delete endpoint exists for categories yet, so this shows the
// live list read-only instead of a fake add/remove UI that couldn't persist
// anything.
export default function VendorCategoriesCard() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    categoriesService
      .getAll()
      .then(setCategories)
      .catch(() => setFailed(true));
  }, []);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
          <Tag size={18} className="text-[#A3391C]" />
          Vendor Categories
        </h3>
      </div>

      {failed ? (
        <p className="mt-3 text-sm text-[#8B716A]">Couldn&apos;t load categories.</p>
      ) : !categories ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="h-7 w-20 animate-pulse rounded-full bg-[#DCCFC0]/60" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="mt-3 text-sm text-[#8B716A]">No categories yet.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category, i) => (
            <span
              key={category.id}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
      <p className="mt-3 text-[11px] text-[#8B716A]">
        Read-only — adding or removing categories isn&apos;t available yet.
      </p>
    </div>
  );
}
