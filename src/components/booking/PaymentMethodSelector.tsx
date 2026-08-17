import { Info } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MockPayment } from "@/lib/mock/types";

// No real payment gateway is wired up anywhere in this codebase — InstaPay
// is mocked as the single connected account (matches the real
// PaymentMethod.InstaPay backend enum value). There's nothing to "select"
// since there's only one method, so this just displays the connection
// status rather than offering a card list + add-new-card flow.
export default function PaymentMethodSelector({ method }: { method: MockPayment }) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Secure Payment</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Payment Method</h3>

      <div className="mt-3 flex items-center justify-between rounded-[12px] border border-[#af3718] bg-[#fdf0ec] p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-[8px] bg-white text-[13px] font-black tracking-tight text-[#7B2FF2]">
            IP
          </span>
          <div className="text-left">
            <p className="flex items-center gap-1.5 text-[14px] font-bold text-[#252323]">
              InstaPay
              <span className="rounded-full bg-[#a79a90] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-white">
                Demo
              </span>
            </p>
            <p className="text-[12px] text-[#6d5d54]">
              Secure instant payment
              {method.isConnected ? <span className="text-[#2E9E68]"> • Connected Account</span> : null}
            </p>
          </div>
        </div>
        <span className="grid size-6 place-items-center rounded-full bg-[#af3718] text-white">✓</span>
      </div>

      {/* No real payment gateway is wired up (see the note above the
          component) — this used to say "You'll be redirected to the
          InstaPay app to complete your payment securely," which reads as a
          real integration. Being upfront instead. */}
      <p className="mt-2 flex items-start gap-1.5 text-[12px] text-[#a79a90]">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        This is a demo payment method — no real charge happens and no money moves.
      </p>
    </div>
  );
}
