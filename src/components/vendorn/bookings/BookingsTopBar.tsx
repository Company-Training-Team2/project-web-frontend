"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BookingsTopBar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#DCCFC0] bg-[#FBF6EF] px-4 py-4 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button className="text-[#A3391C] md:hidden" aria-label="Menu">
          <Menu size={22} />
        </button>
        <span className="hidden font-medium text-[#2B2622] md:inline">Vendor Portal</span>
        <div className="relative hidden w-64 lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8B7E72]" />
          <input
            type="search"
            placeholder="Search bookings..."
            className="h-9 w-full rounded-full border border-[#DCCFC0] bg-white pl-9 pr-3 text-[13px] outline-none placeholder:text-[#8B7E72]"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 md:gap-4">
        <button aria-label="Notifications" className="text-[#2B2622]">
          <Bell size={19} />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="grid size-8 place-items-center rounded-full bg-[#A3391C] text-[12px] font-bold text-white">
            {user?.name?.[0]?.toUpperCase() ?? "V"}
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-[#2B2622]">{user?.name || "Vendor"}</p>
            <p className="text-[10px] text-[#8B7E72]">Vendor Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
