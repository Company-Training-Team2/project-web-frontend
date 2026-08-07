"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import CheckoutSummaryCard from "./CheckoutSummaryCard";
import ContactDetailsForm from "./ContactDetailsForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummaryBlock from "./OrderSummaryBlock";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { MockPackage, MockVendor } from "@/lib/mock/types";
import { getVendorDetail } from "@/services/vendor.service";
import { bookingService, getBookingErrorMessage } from "@/services/booking.service";
import { eventService } from "@/services/event.service";
import { MOCK_PAYMENTS } from "@/lib/mock/bookings";
import { saveBookingDraft, useBookingDraft } from "@/lib/mock/bookingDraft";
import { toDateOnlyString } from "@/lib/date";

// No useRequireAuth here — guests can review their reservation and checkout
// details freely. An account is only required at the actual "Pay" action
// (handlePay below), which is the moment a real order/booking is placed.
export default function CheckoutScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const draft = useBookingDraft();
  const [isPaying, setIsPaying] = useState(false);
  const instaPay = MOCK_PAYMENTS[0];

  // Real WorkPostController.GetById is public and live — see
  // getVendorDetail() in vendor.service.ts for the fixture fallback.
  const [vendor, setVendor] = useState<MockVendor | null | undefined>(undefined);
  const [pkg, setPkg] = useState<MockPackage | undefined>(undefined);

  // Defensive: a manufactured multi-step flow with no server session — if a
  // visitor lands here directly without picking a vendor/package first, send
  // them back to start the reservation. `draft === undefined` means
  // sessionStorage hasn't been checked yet (server render / first tick) —
  // only redirect once it's resolved to a definite null/incomplete value.
  useEffect(() => {
    if (draft === undefined) return;
    if (!draft || !draft.vendorId || !draft.packageId) {
      router.replace("/vendors");
    }
  }, [draft, router]);

  useEffect(() => {
    if (!draft?.vendorId) return;
    let cancelled = false;
    getVendorDetail(draft.vendorId).then((result) => {
      if (cancelled) return;
      setVendor(result?.vendor ?? null);
      setPkg(result?.packages.find((p) => p.id === draft.packageId));
    });
    return () => {
      cancelled = true;
    };
  }, [draft?.vendorId, draft?.packageId]);

  if (draft === undefined || (draft?.vendorId && vendor === undefined)) {
    return <LoadingScreen fullScreen={false} />;
  }
  if (!draft || !draft.vendorId) return null;
  if (!vendor) return null;

  const fullName = user?.name ?? "";
  const email = user?.email ?? "";

  const handlePay = async () => {
    if (!isAuthenticated) {
      // This is the actual order-placing action — the one point in the
      // booking flow that requires an account. Preserve the draft (already
      // in sessionStorage) and send the guest to sign in, then straight
      // back here to finish paying.
      router.push("/login?redirect=/booking/checkout");
      return;
    }
    setIsPaying(true);
    saveBookingDraft({ contactName: fullName, contactEmail: email, paymentMethodId: instaPay.id });

    const goToSuccess = (bookingId?: string) => {
      const params = new URLSearchParams({ name: fullName.split(" ")[0] || "there" });
      if (bookingId) params.set("bookingId", bookingId);
      router.push(`/booking/success?${params}`);
    };

    // Only a real, numeric WorkPost/ServicePackage id (vs. a "v1"/"p1" mock
    // fixture id) can become a real Booking row — mock ids belong to demo
    // vendors that don't exist in the database. There's still no real
    // payment gateway either way (see README): this only decides whether a
    // real Booking gets persisted, not whether "payment" itself is real.
    const canPersistReal = /^\d+$/.test(vendor.id) && pkg && /^\d+$/.test(pkg.id);

    if (!canPersistReal) {
      // No real vendor/package to book — keep the existing simulated
      // redirect-and-return round trip so the demo flow still completes.
      setTimeout(() => goToSuccess(), 900);
      return;
    }

    try {
      const event = await eventService.ensureEvent({
        city: vendor.city,
        guestCount: draft.guestCount ?? 1,
        bookingDate: draft.bookingDate,
      });
      const booking = await bookingService.createBooking({
        eventId: event.id,
        workPostId: Number(vendor.id),
        bookingDate: draft.bookingDate ?? toDateOnlyString(new Date()),
        quantity: draft.guestCount ?? 1,
      });
      saveBookingDraft({ bookingId: String(booking.id) });
      goToSuccess(String(booking.id));
    } catch (error: unknown) {
      setIsPaying(false);
      toast.error(getBookingErrorMessage(error, "Couldn't complete your booking. Please try again."));
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-10">
      <div className="mx-auto w-full max-w-2xl lg:max-w-5xl">
        <div className="px-4 pt-6 sm:px-5 lg:px-10">
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="grid size-9 place-items-center rounded-full bg-white text-[#252323] shadow-sm"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="mt-4">
            <SectionEyebrow>Step 3 of 3</SectionEyebrow>
            <h1 className="font-serif text-[28px] font-bold text-[#252323] lg:text-[36px]">Checkout</h1>
            <p className="mt-1 text-[13px] text-[#6d5d54] lg:text-[14px]">
              Review your reservation and complete your payment securely with InstaPay.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-[1fr_360px] lg:items-start lg:px-10">
          <div className="space-y-1 lg:space-y-6 lg:px-0">
            <CheckoutSummaryCard vendor={vendor} pkg={pkg} bookingDate={draft.bookingDate} guestCount={draft.guestCount} />
            <ContactDetailsForm fullName={fullName} email={email} />
            <PaymentMethodSelector method={instaPay} />
          </div>

          <div className="px-5 pt-6 lg:sticky lg:top-6 lg:px-0 lg:pt-0">
            <OrderSummaryBlock
              packageName={pkg?.name ?? "Package"}
              guestCount={draft.guestCount ?? 1}
              pricePerGuest={pkg?.pricePerGuest ?? vendor.price}
              onPay={handlePay}
              isPaying={isPaying}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
