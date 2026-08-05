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
import { getPackageById, getVendorById } from "@/lib/mock/vendors";
import { BookingDraft, clearBookingDraft, generateConfirmationCode, getBookingDraft } from "@/lib/mock/bookingDraft";

export default function PaymentSuccessScreen() {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "there";

  // Same reasoning as CheckoutScreen: read sessionStorage after mount, not
  // inside useState(), to avoid a server/client hydration mismatch.
  const [draft, setDraft] = useState<BookingDraft | null | undefined>(undefined);
  const confirmationCode = useMemo(() => generateConfirmationCode(), []);

  useEffect(() => {
    setDraft(getBookingDraft());
  }, []);

  useEffect(() => {
    if (draft === null) {
      router.replace("/vendors");
      return;
    }
    if (draft) {
      // Clear only after the confirmation has painted, so a refresh mid-render
      // doesn't wipe the data before the user sees it.
      clearBookingDraft();
    }
  }, [draft, router]);

  if (draft === undefined) return <LoadingScreen fullScreen={false} />;
  if (!draft) return null;

  const vendor = getVendorById(draft.vendorId);
  const pkg = getPackageById(draft.packageId);
  if (!vendor) return null;

  const total = (draft.guestCount ?? 1) * (pkg?.pricePerGuest ?? vendor.price) + 1890 + 500;

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
          <Link href="/bookings">View My Booking →</Link>
        </Button>
        <Link href="/vendors" className="block text-[13px] font-medium text-[#6d5d54] hover:text-[#af3718]">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
