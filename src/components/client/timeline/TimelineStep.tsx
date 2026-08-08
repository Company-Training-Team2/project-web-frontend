import { Check, Circle } from "lucide-react";

export type StepStatus = "completed" | "current" | "upcoming";

export type Step = {
  id: string;
  status: StepStatus;
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
};

const statusDot: Record<StepStatus, string> = {
  completed: "bg-[#1F7A4D] border-[#1F7A4D]",
  current: "bg-[#A3391C] border-[#A3391C]",
  upcoming: "bg-[#F6ECE0] border-[#DCCFC0]",
};

const badgeStyles: Record<StepStatus, string> = {
  completed: "bg-green-100 text-green-700",
  current: "bg-[#EDE0D2] text-[#A3391C]",
  upcoming: "bg-[#EDE0D2] text-[#8B7E72]",
};

export default function TimelineStep({
  step,
  isLast,
}: {
  step: Step;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${statusDot[step.status]}`}
        >
          {step.status === "completed" && (
            <Check size={13} className="text-white" />
          )}
          {step.status === "current" && (
            <Circle size={8} className="fill-white text-white" />
          )}
        </span>
        {!isLast && (
          <span
            className={`w-0.5 flex-1 mt-1 ${
              step.status === "completed" ? "bg-[#1F7A4D]" : "bg-[#DCCFC0]"
            }`}
          />
        )}
      </div>

      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-6"}`}>
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`font-serif font-semibold ${
              step.status === "upcoming" ? "text-[#8B7E72]" : "text-[#2B2622]"
            }`}
          >
            {step.title}
          </h3>
          {step.badge && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${badgeStyles[step.status]}`}
            >
              {step.badge}
            </span>
          )}
        </div>

        <p className="text-sm text-[#8B716A] mt-1">{step.description}</p>

        {step.children}
      </div>
    </div>
  );
}