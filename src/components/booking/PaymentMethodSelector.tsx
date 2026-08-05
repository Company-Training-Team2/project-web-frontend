import Link from "next/link";
import { Check, CreditCard, Plus } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MockPayment } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

export default function PaymentMethodSelector({
  methods,
  selectedId,
  onSelect,
}: {
  methods: MockPayment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Secure Payment</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Payment method</h3>

      <div className="mt-3 space-y-2">
        {methods.map((method) => {
          const selected = method.id === selectedId;
          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-[12px] border p-3.5 transition",
                selected ? "border-[#af3718] bg-[#fdf0ec]" : "border-[#e5ded2] bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-[8px] bg-[#252323] text-white">
                  <CreditCard className="size-4" />
                </span>
                <div className="text-left">
                  <p className="text-[14px] font-bold text-[#252323]">
                    {method.cardBrand} •••• {method.last4}
                  </p>
                  <p className="text-[12px] text-[#a79a90]">Expires {method.expiry}</p>
                </div>
              </div>
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border-2",
                  selected ? "border-[#af3718] bg-[#af3718] text-white" : "border-[#ded8d2]"
                )}
              >
                {selected ? <Check className="size-3.5" /> : null}
              </span>
            </button>
          );
        })}

        <Link
          href="/payment-methods"
          className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-dashed border-[#ded8d2] bg-white p-3.5 text-[13px] font-medium text-[#6d5d54]"
        >
          <Plus className="size-4" />
          Add a new card
        </Link>
      </div>
    </div>
  );
}
