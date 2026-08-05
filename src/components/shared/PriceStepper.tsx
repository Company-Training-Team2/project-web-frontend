"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/** The −/count/+ rust-circle stepper used for guest-count style inputs
 * (Booking Screen "Guests", Search Results Desktop sidebar "Guest Count"). */
export default function PriceStepper({ value, onChange, min = 1, max = 2000, step = 1, className }: PriceStepperProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - step))}
        className="grid size-8 place-items-center rounded-full bg-[#f3ede3] text-[#252323] transition hover:bg-[#e9dfd1]"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-[2.5ch] text-center text-[18px] font-bold text-[#252323]">{value}</span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + step))}
        className="grid size-8 place-items-center rounded-full bg-[#af3718] text-white transition hover:bg-[#9f3216]"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
