import { Sparkles } from "lucide-react";

export default function AiSuggestedCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 pt-4">
        <Sparkles size={13} className="text-[#A3391C]" />
        <span className="text-[10px] font-semibold text-[#A3391C] uppercase tracking-wide">
          AI Suggested for You
        </span>
      </div>

      <div className="h-40 bg-[#DCCFC0] mt-3" />

      <div className="p-4">
        <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">
          Videography
        </p>
        <div className="flex items-center justify-between mt-1">
          <h3 className="font-serif font-semibold text-[#2B2622]">
            Lumina Cinema Collective
          </h3>
          <span className="font-semibold text-sm text-[#A3391C]">
            Starts $3.5k
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-[#1F7A4D] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90">
            Inquire
          </button>
          <button className="flex-1 border border-[#DCCFC0] text-[#2B2622] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2]">
            Preview Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}