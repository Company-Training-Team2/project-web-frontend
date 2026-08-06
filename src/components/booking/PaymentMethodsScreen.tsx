"use client";

import { useState } from "react";

import PaymentMethodsHeader from "./PaymentMethodsHeader";
import SecureTransactionsBanner from "./SecureTransactionsBanner";
import SavedCardRow from "./SavedCardRow";
import AddNewCardButton from "./AddNewCardButton";
import SecurityDisclaimerCard from "./SecurityDisclaimerCard";
import BottomNav from "@/components/shared/BottomNav";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { MOCK_PAYMENTS } from "@/lib/mock/bookings";
import { MockPayment } from "@/lib/mock/types";

export default function PaymentMethodsScreen() {
  useRequireAuth();
  const [methods, setMethods] = useState<MockPayment[]>(MOCK_PAYMENTS);

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-10">
      <div className="mx-auto w-full max-w-xl">
        <PaymentMethodsHeader />
        <SecureTransactionsBanner />

        <div className="px-4 pt-6 sm:px-5 lg:px-10">
          <SectionEyebrow tone="muted">Saved Cards</SectionEyebrow>
          <div className="mt-3 space-y-3">
            {methods.map((method) => (
              <SavedCardRow
                key={method.id}
                method={method}
                onRemove={() => setMethods((prev) => prev.filter((m) => m.id !== method.id))}
              />
            ))}
            <AddNewCardButton onAdd={(card) => setMethods((prev) => [...prev, card])} />
          </div>
        </div>

        <SecurityDisclaimerCard />
      </div>
      <BottomNav active="profile" />
    </div>
  );
}
