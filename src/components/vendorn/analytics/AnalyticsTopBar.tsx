import { Bell, CalendarDays, ChevronDown } from "lucide-react";

export default function AnalyticsTopBar() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 md:px-5 py-3">
      <div className="flex items-center gap-4">
        <h1 className="font-serif text-lg font-bold text-[#2B2622] whitespace-nowrap">
          Analytics Intelligence
        </h1>

        <button className="hidden sm:flex items-center gap-2 text-xs md:text-sm border border-[#DCCFC0] bg-white rounded-lg px-3 py-1.5 text-[#8B716A] hover:bg-[#EDE0D2]">
          <CalendarDays size={14} />
          October 1, 2023 - October 31, 2023
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Bell size={18} className="text-[#8B716A]" />

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#DCCFC0]" />
          <div className="hidden md:block text-left">
            <p className="font-medium text-[#2B2622] leading-tight text-sm">
              Alexandre Maison
            </p>
            <p className="text-xs text-[#8B7E72] leading-tight">
              MASTER PLANNER
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}