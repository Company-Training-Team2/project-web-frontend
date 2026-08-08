"use client";

import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Shared top bar for every /admin/* page — Figma (docs/figma/Admin/*.jpeg)
// uses the identical search + System Status + Resources + bell + help +
// account pill pattern on Dashboard, User Management, Vendor Directory,
// Analytics, and Settings. Reports/Analytics previously had their own
// one-off headers with a different pattern (Select Packages/New Analysis,
// Filters/Export) that didn't match any of the reference screens — this
// replaces all six divergent copies with one, and wires the account pill to
// the real signed-in admin instead of a static "Admin User" label.
export default function AdminTopBar({ searchPlaceholder }: { searchPlaceholder: string }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 md:px-5 py-3">
      <div className="flex items-center gap-2 text-[#8B716A] flex-1 max-w-xs">
        <Search size={16} />
        <input
          placeholder={searchPlaceholder}
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 text-sm text-[#2B2622]">
        <div className="hidden lg:flex items-center gap-6 text-[#8B716A]">
          <span>System Status</span>
          <span>Resources</span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Bell size={18} className="text-[#8B716A]" />
          <HelpCircle size={18} className="text-[#8B716A]" />

          <div className="flex items-center gap-2">
            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#A3391C] text-xs font-bold text-white">
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="hidden md:block leading-tight">
              <p className="font-medium text-[#2B2622]">{user?.name ?? "Admin"}</p>
              <p className="text-[11px] text-[#8B716A]">
                {user?.role ? user.role[0].toUpperCase() + user.role.slice(1) : "Administrator"}
              </p>
            </div>
            <ChevronDown size={14} className="hidden md:inline text-[#8B716A]" />
          </div>
        </div>
      </div>
    </div>
  );
}
