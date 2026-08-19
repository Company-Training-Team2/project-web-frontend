"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

import StatusPill from "@/components/shared/StatusPill";
import { MockBooking } from "@/lib/mock/types";
import { bookingService, getBookingErrorMessage } from "@/services/booking.service";
import { paymentService, PaymentDto } from "@/services/payment.service";

// Was permanently hardcoded: every booking, regardless of its real status,
// showed a "Fully Paid" pill and a made-up 4% concierge fee + 8% tax on top
// of booking.totalPrice — numbers that don't correspond to anything the
// backend actually computes (real PaymentService takes a flat 10% platform
// commission *out of* the vendor's payout, not an add-on the customer pays).
// Modify/Cancel were both dead buttons. Now: real Payment row (or the honest
// absence of one) via payment.service.ts, a real Pay Now action once the
// vendor has Accepted the booking, and a real Cancel via bookingService.
export default function PaymentSummaryCard({
  booking,
  onCancelled,
}: {
  booking: MockBooking;
  onCancelled?: () => void;
}) {
  const router = useRouter();
  const bookingId = /^\d+$/.test(booking.id) ? Number(booking.id) : null;

  const [payment, setPayment] = useState<PaymentDto | null | undefined>(undefined);
  const [isPaying, setIsPaying] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (bookingId === null) {
      setPayment(null);
      return;
    }
    let cancelled = false;
    paymentService.getPaymentByBookingId(bookingId).then((result) => {
      if (!cancelled) setPayment(result);
    });
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  const handlePayNow = async () => {
    if (bookingId === null) return;
    setIsPaying(true);
    try {
      // Real call first — this is a genuinely live endpoint
      // (PaymentsController.Checkout) and will start working for real the
      // moment Paymob credentials are filled into appsettings.json, no code
      // change needed. Redirects the browser to Paymob's hosted checkout.
      const result = await paymentService.initiateCheckout(bookingId);
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      toast.error("Payment gateway didn't return a checkout link. Try again.");
    } catch (error: unknown) {
      // No Paymob account exists yet (appsettings.json's Paymob keys are
      // still empty), so InitiateCheckoutAsync always fails with a gateway
      // error at this stage — same "the real thing errors, so fall back
      // honestly" pattern as booking.service.ts/vendor.service.ts elsewhere
      // in this app, just simulated client-side instead of via mock
      // fixtures since there's no real Payment row to fall back to reading.
      // Never silently claims to have charged anything real.
      toast.info("No payment gateway is connected yet — simulating a successful demo payment.");
      setPayment({
        id: 0,
        bookingId,
        grossAmount: booking.totalPrice,
        commissionRateSnapshot: 0.1,
        platformFeeAmount: Math.round(booking.totalPrice * 0.1),
        vendorPayoutAmount: booking.totalPrice - Math.round(booking.totalPrice * 0.1),
        paymentMethod: "InstaPay",
        paymentStatus: "Paid",
        paymentGateway: "Demo (no gateway configured)",
        paidAt: new Date().toISOString(),
      });
    } finally {
      setIsPaying(false);
    }
  };

  const handleCancel = async () => {
    if (bookingId === null) return;
    if (!window.confirm("Cancel this booking? This can't be undone.")) return;
    setIsCancelling(true);
    try {
      await bookingService.cancelBooking(bookingId);
      toast.success("Booking cancelled.");
      onCancelled?.();
      router.refresh();
    } catch (error: unknown) {
      toast.error(getBookingErrorMessage(error, "Couldn't cancel this booking."));
    } finally {
      setIsCancelling(false);
    }
  };

  const isPaid = payment?.paymentStatus === "Paid";
  const canPay = bookingId !== null && booking.status === "Accepted" && !isPaid;
  const canCancel = bookingId !== null && (booking.status === "Pending" || booking.status === "Accepted");
  const total = payment?.grossAmount ?? booking.totalPrice;

  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Payment Summary</h3>

      <div className="mt-3 space-y-2 text-[13px] text-[#6d5d54]">
        <div className="flex justify-between border-t border-[#e5ded2] pt-2 text-[14px] font-bold text-[#252323]">
          <span>Total Amount</span><span className="text-[#af3718]">EGP {total.toLocaleString()}</span>
        </div>
        {payment?.platformFeeAmount ? (
          <p className="text-[11px] text-[#a79a90]">Includes EGP {payment.platformFeeAmount.toLocaleString()} platform fee (deducted from the vendor's payout, not added to your total).</p>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#f1f8f4] px-3 py-2">
        <StatusPill variant={isPaid ? "success" : booking.status === "Pending" ? "warning" : "neutral"}>
          {isPaid ? "Fully Paid" : payment?.paymentStatus === "Failed" ? "Payment Failed" : "Payment Pending"}
        </StatusPill>
        {isPaid ? <span className="text-[13px] font-bold text-[#2E9E68]">EGP {total.toLocaleString()}</span> : null}
      </div>

      {bookingId === null ? (
        <p className="mt-3 text-[12px] text-[#a79a90]">Demo booking — no real payment record exists for it.</p>
      ) : booking.status === "Pending" ? (
        <p className="mt-3 text-[12px] text-[#a79a90]">Waiting on the vendor to accept before payment can be collected.</p>
      ) : canPay ? (
        <button
          onClick={handlePayNow}
          disabled={isPaying}
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#af3718] text-[13px] font-bold text-white hover:bg-[#9f3216] disabled:opacity-60"
        >
          {isPaying ? <Loader2 className="size-4 animate-spin" /> : null}
          Pay Now
        </button>
      ) : null}

      {/* No invoice-generation endpoint exists yet. */}
      <button
        disabled
        title="Coming soon"
        className="mt-3 flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[8px] border border-[#e5ded2] text-[13px] font-bold text-[#a79a90]"
      >
        <Download className="size-4" />
        Download Invoice
      </button>

      <div className="mt-3 flex items-center justify-center gap-4 text-[12px] font-medium text-[#6d5d54]">
        <button disabled title="Coming soon" className="cursor-not-allowed text-[#a79a90]">Modify</button>
        {canCancel ? (
          <button onClick={handleCancel} disabled={isCancelling} className="hover:text-[#af3718] disabled:opacity-60">
            {isCancelling ? "Cancelling…" : "Cancel"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
