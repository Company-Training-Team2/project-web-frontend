"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";

export default function BrowseVendorsHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-5 pt-6 lg:px-10">
      <button
        onClick={() => router.back()}
        aria-label="Back"
        className="grid size-9 place-items-center rounded-full bg-white text-[#252323] shadow-sm"
      >
        <ArrowLeft className="size-4" />
      </button>

      <div className="text-center">
        <SectionEyebrow>2,500+ Verified</SectionEyebrow>
        <h1 className="font-serif text-[26px] font-bold text-[#252323]">Browse Vendors</h1>
      </div>

      <button
        aria-label="Filters"
        className="grid size-9 place-items-center rounded-full bg-[#102b1f] text-white"
      >
        <SlidersHorizontal className="size-4" />
      </button>
    </div>
  );
}
