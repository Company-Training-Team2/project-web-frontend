import { SlidersHorizontal, BarChart3 } from "lucide-react";

export default function ExpensesOverviewCard() {
  const percent = 64;

  return (
    <div className="px-4 md:px-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-[#A3391C] uppercase tracking-wide">
            Financial Overview
          </p>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622] mt-1">
            Expenses
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-[#8B716A] hover:text-[#2B2622] p-2 rounded-lg border border-[#DCCFC0] bg-[#F6ECE0]">
            <SlidersHorizontal size={16} />
          </button>
          <button className="text-[#8B716A] hover:text-[#2B2622] p-2 rounded-lg border border-[#DCCFC0] bg-[#F6ECE0]">
            <BarChart3 size={16} />
          </button>
        </div>
      </div>

      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#2B2622]">Total Budget Used</span>
          <span className="font-bold text-lg text-[#A3391C]">{percent}%</span>
        </div>

        <div className="w-full bg-[#EDE0D2] rounded-full h-2 mt-3">
          <div
            className="bg-[#A3391C] h-2 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#8B716A] mt-2">
          <span>$2,800.00 Spent</span>
          <span>$20,000.00 Total</span>
        </div>
      </div>
    </div>
  );
}