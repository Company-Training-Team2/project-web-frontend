"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";

export default function DocumentsTopBar() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-[#F6ECE0] border-b border-[#DCCFC0]">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} aria-label="Back" className="text-[#A3391C]">
          <ChevronLeft size={22} />
        </button>
        <span className="font-serif text-lg md:text-xl font-bold text-[#A3391C]">
          EventHub
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Search size={18} className="text-[#8B716A] hidden sm:block" />
        <div className="w-9 h-9 rounded-full bg-[#DCCFC0] shrink-0" />
      </div>
    </div>
  );
}
