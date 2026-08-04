import { ChevronDown } from "lucide-react";

export default function RevenueIntelligence() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-800">
            Revenue Intelligence
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Weekly growth trends across all platform tiers.
          </p>
        </div>

        <button className="flex items-center gap-1 text-xs md:text-sm border rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 shrink-0">
          This Week
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="mt-6 h-56 md:h-72 rounded-xl bg-[#F6F1EB] flex items-center justify-center text-gray-400 text-sm">
        Revenue Chart
      </div>
    </div>
  );
}