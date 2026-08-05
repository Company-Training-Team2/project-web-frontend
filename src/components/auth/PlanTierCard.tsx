"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlanTier {
  id: string;
  name: string;
  priceLabel: string;
  features: string[];
  recommended?: boolean;
}

export const VENDOR_PLAN_TIERS: PlanTier[] = [
  { id: "starter", name: "Starter", priceLabel: "0 EGP/mo", features: ["Basic profile listing", "Up to 5 inquiries/mo", "Standard support"] },
  {
    id: "professional",
    name: "Professional",
    priceLabel: "1,500 EGP/mo",
    features: ["Enhanced profile visibility", "Unlimited inquiries", "Priority support", "Featured placement"],
    recommended: true,
  },
  { id: "premium", name: "Premium", priceLabel: "3,500 EGP/mo", features: ["Top tier visibility", "Dedicated Account Manager", "Advanced analytics"] },
];

export default function PlanTierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: PlanTier;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex w-full flex-col rounded-[14px] border p-5 text-left transition",
        selected ? "border-[#af3718] bg-[#fdf0ec]" : "border-[#ded8d2] bg-white"
      )}
    >
      {tier.recommended ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#af3718] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
          Recommended
        </span>
      ) : null}
      <h4 className="font-serif text-[20px] font-bold text-[#252323]">{tier.name}</h4>
      <p className="mt-1 text-[15px] font-bold text-[#252323]">{tier.priceLabel}</p>
      <ul className="mt-3 space-y-1.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-1.5 text-[13px] text-[#6d5d54]">
            <Check className="mt-0.5 size-3.5 shrink-0 text-[#af3718]" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-2 text-[13px] font-bold text-[#252323]">
        <span
          className={cn(
            "grid size-4 place-items-center rounded-full border-2",
            selected ? "border-[#af3718] bg-[#af3718]" : "border-[#ded8d2]"
          )}
        >
          {selected ? <span className="size-1.5 rounded-full bg-white" /> : null}
        </span>
        {selected ? "Selected" : `Select ${tier.name}`}
      </div>
    </button>
  );
}
