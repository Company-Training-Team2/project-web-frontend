"use client";

import { Bell, CalendarDays } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AnalyticsTopBar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5">
      <div className="flex items-center gap-4">
        <h1 className="whitespace-nowrap font-serif text-lg font-bold text-[#2B2622]">
          Analytics Intelligence
        </h1>

        <span className="hidden items-center gap-2 rounded-lg border border-[#DCCFC0] bg-white px-3 py-1.5 text-xs text-[#8B716A] sm:flex md:text-sm">
          <CalendarDays size={14} />
          All time
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Bell size={18} className="text-[#8B716A]" />

        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-full bg-[#A3391C]/10 text-xs font-bold text-[#A3391C]">
            {user?.name?.[0]?.toUpperCase() ?? "V"}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium leading-tight text-[#2B2622]">{user?.name || "Vendor"}</p>
            <p className="text-xs leading-tight text-[#8B7E72]">VENDOR</p>
          </div>
        </div>
      </div>
    </div>
  );
}
