"use client";

import { Search, Bell, Plus, User } from "lucide-react";

export default function AnalyticsTopBar() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 md:px-5 py-3">
      <div className="relative w-full md:max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7E72]" />
        <input
          placeholder="Search analytics..."
          className="w-full rounded-xl border border-[#DCCFC0] bg-white/60 pl-10 pr-4 py-2 text-sm outline-none focus:border-[#A3391C]"
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="hidden sm:block text-sm text-[#2B2622] hover:text-[#A3391C] transition">
          Select Packages
        </button>

        <button className="relative text-[#2B2622] hover:text-[#A3391C] transition">
          <Bell size={18} />
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-[#A3391C] px-4 py-2 text-sm text-white hover:bg-[#8a2f16] transition">
          <Plus size={16} />
          New Analysis
        </button>

        <div className="w-9 h-9 rounded-full bg-[#2B2622] flex items-center justify-center text-white shrink-0">
          <User size={16} />
        </div>
      </div>
    </div>
  );
}