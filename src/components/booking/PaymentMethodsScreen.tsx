"use client";

import { useEffect, useState } from "react";
import { CreditCard, Trash2 } from "lucide-react";
import { toast } from "sonner";

import PaymentMethodsHeader from "./PaymentMethodsHeader";
import SecureTransactionsBanner from "./SecureTransactionsBanner";
import SecurityDisclaimerCard from "./SecurityDisclaimerCard";
import BottomNav from "@/components/shared/BottomNav";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { paymentService, getPaymentErrorMessage, SavedPaymentMethod } from "@/services/payment.service";

// Was a single hardcoded MOCK_PAYMENTS[0] "InstaPay account" with a fake
// connect/disconnect toggle (InstaPayAccountCard) — nothing here ever
// touched a real endpoint despite PaymentsController's GET/POST /payments/
// methods and DELETE /payments/methods/{id} being fully built. Now lists
// the customer's real saved methods. Adding a *new* one is left as an
// honest "coming soon" — the backend endpoint only accepts an
// already-tokenized instrument (GatewayToken from a real card-tokenization
// flow), and no such client-side tokenization UI exists in this codebase
// yet to produce one.
export default function PaymentMethodsScreen() {
  useRequireAuth();

  const [methods, setMethods] = useState<SavedPaymentMethod[] | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    paymentService
      .getMyPaymentMethods()
      .then((data) => {
        if (!cancelled) setMethods(data);
      })
      .catch(() => {
        if (!cancelled) setMethods([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await paymentService.deletePaymentMethod(id);
      setMethods((prev) => prev?.filter((m) => m.id !== id));
      toast.success("Payment method removed.");
    } catch (error: unknown) {
      toast.error(getPaymentErrorMessage(error, "Couldn't remove that payment method."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-10">
      <div className="mx-auto w-full max-w-xl">
        <PaymentMethodsHeader />
        <SecureTransactionsBanner />

        <div className="px-4 pt-6 sm:px-5 lg:px-10">
          <SectionEyebrow tone="muted">Saved Payment Methods</SectionEyebrow>

          <div className="mt-3 space-y-3">
            {methods === undefined ? (
              <LoadingScreen fullScreen={false} />
            ) : methods.length === 0 ? (
              <div className="rounded-[14px] border border-dashed border-[#e5ded2] bg-white p-4 text-center text-[13px] text-[#6d5d54]">
                No saved payment methods yet. You&apos;ll be asked to pay via Paymob&apos;s secure checkout when a
                booking is ready for payment.
              </div>
            ) : (
              methods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center gap-3 rounded-[14px] border border-[#e5ded2] bg-white p-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[#f3ede3] text-[#af3718]">
                    <CreditCard className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold text-[#252323]">
                      {method.type} {method.isDefault ? <span className="text-[11px] font-normal text-[#2E9E68]">· Default</span> : null}
                    </p>
                    <p className="text-[12px] text-[#6d5d54]">
                      {method.maskedNumber}
                      {method.expiryMonth && method.expiryYear
                        ? ` · Expires ${String(method.expiryMonth).padStart(2, "0")}/${method.expiryYear}`
                        : null}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(method.id)}
                    disabled={deletingId === method.id}
                    aria-label="Remove payment method"
                    className="grid size-9 shrink-0 place-items-center rounded-[8px] text-[#a3391c] hover:bg-[#fbeee9] disabled:opacity-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            disabled
            title="Coming soon — needs a card-tokenization flow"
            className="mt-3 h-11 w-full cursor-not-allowed rounded-[8px] border border-[#e5ded2] text-[13px] font-bold text-[#a79a90]"
          >
            + Add Payment Method
          </button>
        </div>

        <SecurityDisclaimerCard />
      </div>
      <BottomNav active="profile" />
    </div>
  );
}
