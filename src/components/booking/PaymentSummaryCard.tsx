import { Download } from "lucide-react";
import StatusPill from "@/components/shared/StatusPill";
import { MockBooking } from "@/lib/mock/types";

export default function PaymentSummaryCard({ booking }: { booking: MockBooking }) {
  const concierge = Math.round(booking.totalPrice * 0.04);
  const taxes = Math.round(booking.totalPrice * 0.08);
  const total = booking.totalPrice + concierge + taxes;

  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Payment Summary</h3>

      <div className="mt-3 space-y-2 text-[13px] text-[#6d5d54]">
        <div className="flex justify-between"><span>Subtotal</span><span>${booking.totalPrice.toLocaleString()}.00</span></div>
        <div className="flex justify-between"><span>Concierge Fee (4%)</span><span>${concierge.toLocaleString()}.00</span></div>
        <div className="flex justify-between"><span>Taxes &amp; Duties</span><span>${taxes.toLocaleString()}.00</span></div>
        <div className="flex justify-between border-t border-[#e5ded2] pt-2 text-[14px] font-bold text-[#252323]">
          <span>Total Amount</span><span className="text-[#af3718]">${total.toLocaleString()}.00</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#f1f8f4] px-3 py-2">
        <StatusPill variant="success">Fully Paid</StatusPill>
        <span className="text-[13px] font-bold text-[#2E9E68]">${total.toLocaleString()}.00</span>
      </div>

      {/* Mock — no invoice generation endpoint yet. */}
      <button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#af3718] text-[13px] font-bold text-white hover:bg-[#9f3216]">
        <Download className="size-4" />
        Download Invoice
      </button>

      <div className="mt-3 flex items-center justify-center gap-4 text-[12px] font-medium text-[#6d5d54]">
        <button className="hover:text-[#af3718]">Modify</button>
        <button className="hover:text-[#af3718]">Cancel</button>
      </div>
    </div>
  );
}
