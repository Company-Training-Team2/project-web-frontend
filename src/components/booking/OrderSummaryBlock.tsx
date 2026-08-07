import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateOrderTotal } from "@/lib/mock/pricing";

interface OrderSummaryBlockProps {
  packageName: string;
  guestCount: number;
  pricePerGuest: number;
  onPay: () => void;
  isPaying: boolean;
}

export default function OrderSummaryBlock({
  packageName,
  guestCount,
  pricePerGuest,
  onPay,
  isPaying,
}: OrderSummaryBlockProps) {
  const { servicePrice, additionalServices, taxes, total } = calculateOrderTotal(guestCount, pricePerGuest);

  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Order Summary</h3>

      <div className="mt-3 space-y-2 text-[14px] text-[#6d5d54]">
        <div className="flex justify-between">
          <span>Service Price ({packageName} × {guestCount})</span>
          <span>EGP {servicePrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Additional Services</span>
          <span>EGP {additionalServices.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes (14%)</span>
          <span>EGP {taxes.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between border-t border-[#e5ded2] pt-3">
        <p className="text-[14px] font-bold text-[#252323]">Total to Pay</p>
        <p className="text-right font-serif text-[24px] font-bold leading-[1.15] text-[#af3718]">
          EGP {total.toLocaleString()}
        </p>
      </div>

      <Button
        onClick={onPay}
        disabled={isPaying}
        className="mt-4 h-[52px] w-full rounded-[10px] bg-[#af3718] text-[15px] font-bold hover:bg-[#9f3216]"
      >
        {isPaying ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Redirecting to InstaPay
          </>
        ) : (
          <>
            <Lock className="size-4" />
            Pay with InstaPay
          </>
        )}
      </Button>
      <p className="mt-2 text-center text-[11px] text-[#a79a90]">Secure payment powered by InstaPay.</p>
    </div>
  );
}
