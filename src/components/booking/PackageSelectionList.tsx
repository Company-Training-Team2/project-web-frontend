import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MockPackage } from "@/lib/mock/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function PackageSelectionList({
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
      <SectionEyebrow>Choose a Tier</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Package selection</h3>

      <div className="mt-3 space-y-3">
        {packages.map((pkg) => {
          const selected = pkg.id === selectedId;
          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-[14px] border p-4 text-left transition",
                selected ? "border-[#af3718] bg-[#fdf0ec]" : "border-[#e5ded2] bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full border-2",
                    selected ? "border-[#af3718] bg-[#af3718] text-white" : "border-[#ded8d2]"
                  )}
                >
                  {selected ? <Check className="size-3.5" /> : null}
                </span>
                <div>
                  <p className="font-serif text-[16px] font-bold text-[#252323]">{pkg.name}</p>
                  <p className="text-[12px] text-[#6d5d54]">{pkg.description}</p>
                </div>
              </div>
              <p className="shrink-0 font-serif text-[16px] font-bold text-[#252323]">{pkg.price.toLocaleString()}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
