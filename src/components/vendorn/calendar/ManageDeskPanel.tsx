import { Lock, Zap } from "lucide-react";

export default function ManageDeskPanel() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Manage Desk</h2>

      <p className="text-xs text-[#8B7E72] mb-1">Block Date Range</p>
      <div className="rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] mb-4">
        Oct 24 — Oct 25
      </div>

      <div className="flex flex-col gap-2">
        <button className="flex items-center justify-center gap-2 bg-[#2B2622] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90">
          <Lock size={15} />
          Set Closure
        </button>

        <button className="flex items-center justify-center gap-2 border border-[#DCCFC0] text-[#A3391C] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2]">
          <Zap size={15} />
          Quick Reservation
        </button>
      </div>
    </div>
  );
}