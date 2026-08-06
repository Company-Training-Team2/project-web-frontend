"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import ReserveHeader from "./ReserveHeader";
import GuestCountCard from "./GuestCountCard";
import PackageSelectionList from "./PackageSelectionList";
import BudgetSummaryCard from "./BudgetSummaryCard";
import SparkleFab from "@/components/shared/SparkleFab";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getPackagesForVendor, getVendorById } from "@/lib/mock/vendors";
import { saveBookingDraft } from "@/lib/mock/bookingDraft";

function ReserveScreenInner() {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendorId = searchParams.get("vendorId") ?? "";
  const initialPackageId = searchParams.get("packageId");

  const vendor = getVendorById(vendorId);
  const packages = getPackagesForVendor(vendorId);

  const [month, setMonth] = useState(new Date(2027, 4, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2027, 4, 18));
  const [guestCount, setGuestCount] = useState(120);
  const [packageId, setPackageId] = useState<string | null>(initialPackageId ?? packages[0]?.id ?? null);

  if (!vendor) {
    return (
      <div className="p-10 text-center text-[#6d5d54]">
        Vendor not found. <Link href="/vendors" className="text-[#af3718] underline">Browse vendors</Link>
      </div>
    );
  }

  const selectedPackage = packages.find((p) => p.id === packageId) ?? packages[0];

  const handleContinue = () => {
    saveBookingDraft({
      vendorId: vendor.id,
      packageId: selectedPackage?.id ?? "",
      bookingDate: selectedDate?.toISOString().slice(0, 10),
      guestCount,
    });
    router.push("/booking/checkout");
  };

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-10">
      <div className="mx-auto w-full max-w-2xl">
        <ReserveHeader vendorName={vendor.businessName.toUpperCase()} month={month} onMonthChange={setMonth} />

        <div className="px-4 sm:px-5 lg:px-10">
          <div className="rounded-[16px] border border-[#e5ded2] bg-white p-3 sm:p-4">
            <Calendar month={month} onMonthChange={setMonth} selectedDate={selectedDate} onSelect={setSelectedDate} />
          </div>
        </div>

        <GuestCountCard guestCount={guestCount} onChange={setGuestCount} />
        {packages.length > 0 ? (
          <PackageSelectionList packages={packages} selectedId={packageId} onSelect={setPackageId} />
        ) : null}

        {selectedPackage ? (
          <BudgetSummaryCard
            packageName={selectedPackage.name}
            guestCount={guestCount}
            pricePerGuest={selectedPackage.pricePerGuest}
          />
        ) : null}

        <div className="px-4 pt-6 sm:px-5 lg:px-10">
          <Button onClick={handleContinue} className="h-[52px] w-full rounded-[10px] bg-[#af3718] text-[15px] font-bold hover:bg-[#9f3216]">
            Continue to Checkout →
          </Button>
        </div>
      </div>

      <SparkleFab />
    </div>
  );
}

export default function ReserveScreen() {
  return (
    <Suspense>
      <ReserveScreenInner />
    </Suspense>
  );
}
