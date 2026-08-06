import { ChevronDown } from "lucide-react";

export default function RevenueIntelligence() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-[#2B2622]">
            Revenue Intelligence
          </h2>
          <p className="text-xs md:text-sm text-[#8B716A] mt-1">
            Weekly growth trends across all platform tiers.
          </p>
        </div>

        <button className="flex items-center gap-1 text-xs md:text-sm border border-[#DCCFC0] rounded-lg px-3 py-1.5 text-[#8B716A] hover:bg-[#EDE0D2] shrink-0">
          This Week
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="mt-6 h-56 md:h-72 rounded-xl bg-[#EDE0D2] flex items-center justify-center text-[#8B716A] text-sm">
        Revenue Chart
      </div>
    </div>
  );
}