import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Requested", date: "Aug 12, 2026", done: true },
  { label: "Deposit Paid", date: "Aug 14, 2026", done: true },
  { label: "Finalized", date: "Sep 01, 2026", done: false },
];

export default function BookingJourneyStepper() {
  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Booking Journey</h3>
      <div className="mt-4 flex items-center justify-between">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-1 flex-col items-center text-center">
            <span
              className={cn(
                "grid size-9 place-items-center rounded-full",
                step.done ? "bg-[#2E9E68] text-white" : "bg-[#af3718] text-white"
              )}
            >
              {step.done ? <Check className="size-4" /> : i + 1}
            </span>
            <p className={cn("mt-2 text-[13px] font-bold", step.done ? "text-[#252323]" : "text-[#af3718]")}>
              {step.label}
            </p>
            <p className="text-[11px] text-[#a79a90]">{step.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
