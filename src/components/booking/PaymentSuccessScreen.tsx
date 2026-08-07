"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import SuccessIcon from "./SuccessIcon";
import ConfirmationCard from "./ConfirmationCard";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Button } from "@/components/ui/button";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { MockPackage, MockVendor } from "@/lib/mock/types";
import { getVendorDetail } from "@/services/vendor.service";
import { clearBookingDraft, generateConfirmationCode, useBookingDraft } from "@/lib/mock/bookingDraft";
import { calculateOrderTotal } from "@/lib/mock/pricing";

export default function PaymentSuccessScreen() {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "there";
  // Set by CheckoutScreen only when a real Booking was actually persisted
  // (see booking.service.ts) — absent for the simulated demo/mock-vendor
  // flow, which falls back to a locally generated code below.
  const realBookingId = searchParams.get("bookingId");

  // `draft` is undefined until sessionStorage has actually been checked
  // (see bookingDraft.ts) — only redirect once that's resolved, otherwise a
  // fresh page load bounces straight back to /vendors before the real value
  // ever loads.
  const draft = useBookingDraft();
  const generatedCode = useMemo(() => generateConfirmationCode(), []);
  const confirmationCode = realBookingId ? `EVH-${realBookingId}` : generatedCode;

  // Real WorkPostController.GetById is public and live — see
  // getVendorDetail() in vendor.service.ts for the fixture fallback.
  const [vendor, setVendor] = useState<MockVendor | null | undefined>(undefined);
  const [pkg, setPkg] = useState<MockPackage | undefined>(undefined);

  useEffect(() => {
    if (draft === undefined) return;
    if (!draft) {
      router.replace("/vendors");
      return;
    }
    // Clear only after the confirmation has painted, so a refresh mid-render
    // doesn't wipe the data before the user sees it.
    clearBookingDraft();
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
  if (!draft) return null;
  if (!vendor) return null;

  // Same formula as OrderSummaryBlock on Checkout, so this confirmation
  // shows the exact amount the customer just "paid" via InstaPay.
  const { total } = calculateOrderTotal(draft.guestCount ?? 1, pkg?.pricePerGuest ?? vendor.price);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f1ea] px-6 py-16 text-center">
      <SuccessIcon />

      <SectionEyebrow className="mt-6">Booking Confirmed</SectionEyebrow>
      <h1 className="mt-2 font-serif text-[30px] font-bold text-[#252323]">
        You&apos;re all set, <span className="italic text-[#af3718]">{name}</span>
      </h1>
      <p className="mx-auto mt-3 max-w-[320px] text-[14px] leading-[1.5] text-[#6d5d54]">
        {vendor.businessName} has received your reservation. A concierge will reach out within 24 hours.
      </p>

      <div className="mt-8 w-full">
        <ConfirmationCard
          vendor={vendor}
          pkg={pkg}
          bookingDate={draft.bookingDate}
          guestCount={draft.guestCount}
          total={total}
          confirmationCode={confirmationCode}
        />
      </div>

      <div className="mt-8 w-full max-w-[360px] space-y-3">
        <Button asChild className="h-[52px] w-full rounded-[10px] bg-[#af3718] font-bold hover:bg-[#9f3216]">
          <Link href={realBookingId ? `/bookings/${realBookingId}` : "/bookings"}>View My Booking →</Link>
        </Button>
        <Link href="/vendors" className="block text-[13px] font-medium text-[#6d5d54] hover:text-[#af3718]">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
