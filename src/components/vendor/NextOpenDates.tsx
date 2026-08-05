"use client";

import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { cn } from "@/lib/utils";

const DATES = [
  { label: "MAY", day: "18" },
  { label: "MAY", day: "24" },
  { label: "JUN", day: "02" },
  { label: "JUN", day: "09" },
];

export default function NextOpenDates({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Next Open Dates</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Availability</h3>

      <div className="mt-3 flex gap-2">
        {DATES.map((d, i) => (
          <button
            key={`${d.label}-${d.day}`}
            onClick={() => onSelect(i)}
            className={cn(
              "flex w-16 flex-col items-center rounded-[12px] border py-2.5 text-center",
              i === selected ? "border-[#252323] bg-[#252323] text-white" : "border-[#e5ded2] bg-white text-[#252323]"
            )}
          >
            <span className="text-[10px] uppercase tracking-[0.08em] opacity-70">{d.label}</span>
            <span className="text-[18px] font-bold">{d.day}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
