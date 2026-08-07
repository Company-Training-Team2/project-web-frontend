"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import CheckoutSummaryCard from "./CheckoutSummaryCard";
import ContactDetailsForm from "./ContactDetailsForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummaryBlock from "./OrderSummaryBlock";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/context/AuthContext";
import { getPackageById, getVendorById } from "@/lib/mock/vendors";
import { MOCK_PAYMENTS } from "@/lib/mock/bookings";
import { saveBookingDraft, useBookingDraft } from "@/lib/mock/bookingDraft";

export default function CheckoutScreen() {
  useRequireAuth();
  const router = useRouter();
  const { user } = useAuth();

  const draft = useBookingDraft();
  const [isPaying, setIsPaying] = useState(false);
  const instaPay = MOCK_PAYMENTS[0];

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

  if (draft === undefined) return <LoadingScreen fullScreen={false} />;
  if (!draft || !draft.vendorId) return null;

  const vendor = getVendorById(draft.vendorId);
  const pkg = getPackageById(draft.packageId);
  if (!vendor) return null;

  const fullName = user?.name ?? "";
  const email = user?.email ?? "";

  const handlePay = () => {
    setIsPaying(true);
    saveBookingDraft({ contactName: fullName, contactEmail: email, paymentMethodId: instaPay.id });
    // No real payment gateway — this just simulates the redirect-and-return
    // round trip a real InstaPay checkout would do.
    setTimeout(() => {
      router.push(`/booking/success?name=${encodeURIComponent(fullName.split(" ")[0] || "there")}`);
    }, 900);
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
