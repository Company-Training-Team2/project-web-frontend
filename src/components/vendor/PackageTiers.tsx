"use client";

import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MockPackage } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

export default function PackageTiers({
  packages,
  selectedId,
  onSelect,
}: {
  packages: MockPackage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Tailored Tiers</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Packages</h3>

      <div className="mt-3 space-y-3">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => onSelect(pkg.id)}
            className={cn(
              "w-full rounded-[14px] border p-4 text-left transition",
              selectedId === pkg.id ? "border-[#af3718] bg-[#fdf0ec]" : "border-[#e5ded2] bg-white"
            )}
          >
            {pkg.badge ? (
              <span className="mb-1.5 inline-block rounded-full bg-[#c59c42] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                {pkg.badge}
              </span>
            ) : null}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-[17px] font-bold text-[#252323]">{pkg.name}</p>
                <p className="text-[13px] text-[#6d5d54]">{pkg.description}</p>
              </div>
              <p className="shrink-0 text-[14px] text-[#252323]">
                EGP <span className="font-bold">{pkg.price.toLocaleString()}</span>
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
