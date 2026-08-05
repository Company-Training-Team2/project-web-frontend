"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";

export default function ReserveHeader({
  vendorName,
  month,
  onMonthChange,
}: {
  vendorName: string;
  month: Date;
  onMonthChange: (next: Date) => void;
}) {
  const router = useRouter();

  return (
    <div className="px-5 pt-6 lg:px-10">
      <button
        onClick={() => router.back()}
        aria-label="Back"
        className="grid size-9 place-items-center rounded-full bg-white text-[#252323] shadow-sm"
      >
        <ArrowLeft className="size-4" />
      </button>

      <div className="mt-4">
        <SectionEyebrow>{vendorName}</SectionEyebrow>
        <h1 className="mt-1 font-serif text-[28px] font-bold text-[#252323]">Reserve your date</h1>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[15px] font-medium text-[#252323]">
        {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        <button
          aria-label="Previous month"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="grid size-7 place-items-center rounded-full bg-white shadow-sm"
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <button
          aria-label="Next month"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="grid size-7 place-items-center rounded-full bg-white shadow-sm"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
