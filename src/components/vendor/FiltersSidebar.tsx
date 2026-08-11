"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import PriceStepper from "@/components/shared/PriceStepper";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";

export interface SearchFilters {
  location: string;
  category: string | null;
  minRating: number;
  guestCount: number;
  maxPrice: number;
}

const MIN_PRICE = 5000;
const MAX_PRICE = 100000;

function formatK(value: number) {
  return `${Math.round(value / 1000)}K`;
}

export default function FiltersSidebar({
  filters,
  onChange,
}: {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
}) {
  const [month, setMonth] = useState(new Date());

  return (
    <aside className="hidden w-[280px] shrink-0 space-y-7 border-r border-[#e5ded2] bg-[#faf6f0] px-6 py-8 lg:block">
      <div>
        <h2 className="font-serif text-[22px] font-bold text-[#252323]">Filters</h2>
        <p className="text-[13px] text-[#a79a90]">Refine Discovery</p>
      </div>

      <div>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">Location</p>
        <select
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          className="h-10 w-full rounded-[8px] border border-[#e5ded2] bg-white px-3 text-[14px]"
        >
          <option>Alexandria, Egypt</option>
          <option>Cairo, Egypt</option>
          <option>London, UK</option>
        </select>
      </div>

      <div>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ ...filters, category: null })}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] font-medium",
              filters.category === null ? "border-[#af3718] bg-[#af3718] text-white" : "border-[#e5ded2] bg-white"
            )}
          >
            All
          </button>
          {MOCK_CATEGORIES.slice(0, 4).map((c) => (
            <button
              key={c.id}
              onClick={() => onChange({ ...filters, category: c.id })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] font-medium",
                filters.category === c.id ? "border-[#af3718] bg-[#af3718] text-white" : "border-[#e5ded2] bg-white"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">
          Price Range{" "}
          <span className="text-[#af3718]">
            {formatK(MIN_PRICE)} - {formatK(filters.maxPrice)}
          </span>
        </p>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#af3718]"
        />
      </div>

      <div>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">Rating</p>
        <button
          onClick={() => onChange({ ...filters, minRating: filters.minRating === 4 ? 0 : 4 })}
          className={cn(
            "flex items-center gap-1 rounded-full border px-3 py-1.5 text-[13px]",
            filters.minRating === 4 ? "border-[#af3718] bg-[#fdf0ec]" : "border-[#e5ded2] bg-white"
          )}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-[#c59c42] text-[#c59c42]" />
          ))}
          & up
        </button>
      </div>

      <div>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">Availability</p>
        <Calendar month={month} onMonthChange={setMonth} size="compact" />
      </div>

      <div>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">Guest Count</p>
        <PriceStepper value={filters.guestCount} onChange={(v) => onChange({ ...filters, guestCount: v })} min={1} max={2000} step={10} />
      </div>

      <Button className="h-11 w-full rounded-[8px] bg-[#af3718] hover:bg-[#9f3216]">Apply Filters</Button>
    </aside>
  );
}
