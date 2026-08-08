import { Calendar } from "lucide-react";

export default function UpcomingMilestoneCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="h-32 bg-[#DCCFC0]" />

      <div className="p-4 bg-[#A3391C] text-white">
        <p className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
          Upcoming Milestone
        </p>
        <h3 className="font-serif font-bold text-lg mt-1">
          Final Floral Walkthrough
        </h3>
        <p className="flex items-center gap-1.5 text-xs opacity-80 mt-2">
          <Calendar size={12} />
          Monday, Aug 12 at 2:00 PM
        </p>
      </div>
    </div>
  );
}