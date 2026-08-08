"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WifiOff } from "lucide-react";

import MarketplaceFooter from "@/components/shared/MarketplaceFooter";
import BottomNav from "@/components/shared/BottomNav";
import LoadingScreen from "@/components/shared/LoadingScreen";
import BookingDetailsTopBar from "./BookingDetailsTopBar";
import BookingJourneyStepper from "./BookingJourneyStepper";
import PackageServicesCard from "./PackageServicesCard";
import EventDayTimeline from "./EventDayTimeline";
import SharedDocumentsCard from "./SharedDocumentsCard";
import CoordinatorNoteCallout from "./CoordinatorNoteCallout";
import VendorMiniCard from "./VendorMiniCard";
import PaymentSummaryCard from "./PaymentSummaryCard";
import NeedAssistanceCard from "./NeedAssistanceCard";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { bookingService } from "@/services/booking.service";
import { getPackageById, getVendorById } from "@/lib/mock/vendors";
import { MockBooking, MockVendor, MockPackage } from "@/lib/mock/types";

// Real bookings/vendors are fetched here (bookingService.getMyBookingById
// resolves the real BookingController + WorkPostController data, or falls
// back to src/lib/mock fixtures) rather than read synchronously, since the
// real endpoint is authenticated and this needed to become a client
// component either way (see useRequireAuth).
export default function BookingDetailsScreen({ bookingId }: { bookingId: string }) {
  useRequireAuth();

  const [booking, setBooking] = useState<MockBooking | null | undefined>(undefined);
  const [vendor, setVendor] = useState<MockVendor | undefined>(undefined);
  const [pkg, setPkg] = useState<MockPackage | undefined>(undefined);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let cancelled = false;
    bookingService.getMyBookingById(bookingId).then(({ booking: result, isLive: live }) => {
      if (cancelled) return;
      setBooking(result ?? null);
      setIsLive(live);
      if (result) {
        // registerVendorsFor() inside getMyBookingById has already run by
        // now for real bookings, so this synchronous lookup finds them.
        setVendor(getVendorById(result.vendorId));
        setPkg(getPackageById(result.packageId));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  if (booking === undefined) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (!booking || !vendor) {
    return (
      <div className="p-10 text-center text-[#6d5d54]">
        Booking not found. <Link href="/bookings" className="text-[#af3718] underline">Back to My Bookings</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-20 lg:pb-0">
      <BookingDetailsTopBar booking={booking} />

      {!isLive ? (
        <div className="mx-auto mt-4 flex max-w-6xl items-center gap-2 rounded-[12px] border border-[#e3aea0] bg-[#fbeee9] px-4 py-3 text-[13px] text-[#8a3b3b] sm:px-6 lg:px-10">
          <WifiOff size={15} className="shrink-0" />
          Couldn&apos;t reach the server — showing sample details below, not this booking&apos;s real data.
        </div>
      ) : null}

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1fr_320px] lg:px-10">
        <div className="space-y-6">
          <BookingJourneyStepper />
          <PackageServicesCard booking={booking} pkg={pkg} />
          <EventDayTimeline />
          <SharedDocumentsCard />
          <CoordinatorNoteCallout />
        </div>

        <div className="space-y-6">
          <VendorMiniCard vendor={vendor} />
          <PaymentSummaryCard booking={booking} />
          <NeedAssistanceCard />
        </div>
      </div>

      <MarketplaceFooter />
      <BottomNav active="bookings" />
    </div>
  );
}
