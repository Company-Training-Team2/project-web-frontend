import { Lightbulb } from "lucide-react";

export default function PlannerInsightsCard() {
  return (
    <div className="px-4 md:px-6 pt-8 pb-28 md:pb-8">
      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={15} className="text-[#1F7A4D]" />
          <h3 className="font-semibold text-sm text-[#2B2622]">
            Planner Insights
          </h3>
        </div>

        <p className="text-sm text-[#8B716A] leading-relaxed">
          You are currently 5% under budget for the Venue. We recommend
          reallocating these funds to your Entertainment category for the
          extra lighting package you requested.
        </p>
      </div>
    </div>
  );
}