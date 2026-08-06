"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Lock } from "lucide-react";

import CheckoutSummaryCard from "./CheckoutSummaryCard";
import ContactDetailsForm from "./ContactDetailsForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummaryBlock from "./OrderSummaryBlock";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { Button } from "@/components/ui/button";
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
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [paymentId, setPaymentId] = useState<string | null>(MOCK_PAYMENTS.find((m) => m.isDefault)?.id ?? null);
  const [isPaying, setIsPaying] = useState(false);

  // Defensive: a manufactured multi-step flow with no server session — if a
  // visitor lands here directly without picking a vendor/package first, send
  // them back to start the reservation.
  useEffect(() => {
    if (!draft || !draft.vendorId || !draft.packageId) {
      router.replace("/vendors");
    }
  }, [draft, router]);

  if (!draft || !draft.vendorId) return null;

  const vendor = getVendorById(draft.vendorId);
  const pkg = getPackageById(draft.packageId);
  if (!vendor) return null;

  const handlePay = () => {
    setIsPaying(true);
    saveBookingDraft({ contactName: fullName, contactEmail: email, paymentMethodId: paymentId ?? undefined });
    setTimeout(() => {
      router.push(`/booking/success?name=${encodeURIComponent(fullName.split(" ")[0] || "there")}`);
    }, 900);
  };

  const total =
    (draft.guestCount ?? 1) * (pkg?.pricePerGuest ?? vendor.price) + 1890 + 500;

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-10">
      <div className="mx-auto w-full max-w-2xl">
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
            <h1 className="mt-1 font-serif text-[28px] font-bold text-[#252323]">Checkout</h1>
          </div>
        </div>

        <div className="mt-4">
          <CheckoutSummaryCard vendor={vendor} pkg={pkg} bookingDate={draft.bookingDate} guestCount={draft.guestCount} />
        </div>

        <ContactDetailsForm fullName={fullName} email={email} onFullNameChange={setFullName} onEmailChange={setEmail} />
        <PaymentMethodSelector methods={MOCK_PAYMENTS} selectedId={paymentId} onSelect={setPaymentId} />
        <OrderSummaryBlock
          packageName={pkg?.name ?? "Package"}
          guestCount={draft.guestCount ?? 1}
          pricePerGuest={pkg?.pricePerGuest ?? vendor.price}
        />

        <div className="px-4 pt-6 sm:px-5 lg:px-10">
          <Button
            onClick={handlePay}
            disabled={isPaying}
            className="h-[56px] w-full rounded-[10px] bg-[#af3718] text-[15px] font-bold hover:bg-[#9f3216]"
          >
            {isPaying ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                <Lock className="size-4" />
                Pay {total.toLocaleString()} EGP
              </>
            )}
          </Button>
          <p className="mt-2 text-center text-[11px] text-[#a79a90]">
            Encrypted &amp; secure • free cancellation for 48h
          </p>
        </div>
      </div>
    </div>
  );
}
