"use client";

import { useState } from "react";

import PaymentMethodsHeader from "./PaymentMethodsHeader";
import SecureTransactionsBanner from "./SecureTransactionsBanner";
import InstaPayAccountCard from "./InstaPayAccountCard";
import SecurityDisclaimerCard from "./SecurityDisclaimerCard";
import BottomNav from "@/components/shared/BottomNav";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { MOCK_PAYMENTS } from "@/lib/mock/bookings";

export default function PaymentMethodsScreen() {
  useRequireAuth();
  const [account, setAccount] = useState(MOCK_PAYMENTS[0]);

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-10">
      <div className="mx-auto w-full max-w-xl">
        <PaymentMethodsHeader />
        <SecureTransactionsBanner />

        <div className="px-4 pt-6 sm:px-5 lg:px-10">
          <SectionEyebrow tone="muted">Payment Method</SectionEyebrow>
          <div className="mt-3">
            <InstaPayAccountCard
              account={account}
              onToggle={() => setAccount((prev) => ({ ...prev, isConnected: !prev.isConnected }))}
            />
          </div>
        </div>

        <SecurityDisclaimerCard />
      </div>
      <BottomNav active="profile" />
    </div>
  );
}
