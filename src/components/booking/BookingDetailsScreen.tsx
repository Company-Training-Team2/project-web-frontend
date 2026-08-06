import { notFound } from "next/navigation";

import MarketplaceFooter from "@/components/shared/MarketplaceFooter";
import BottomNav from "@/components/shared/BottomNav";
import BookingDetailsTopBar from "./BookingDetailsTopBar";
import BookingJourneyStepper from "./BookingJourneyStepper";
import PackageServicesCard from "./PackageServicesCard";
import EventDayTimeline from "./EventDayTimeline";
import SharedDocumentsCard from "./SharedDocumentsCard";
import CoordinatorNoteCallout from "./CoordinatorNoteCallout";
import VendorMiniCard from "./VendorMiniCard";
import PaymentSummaryCard from "./PaymentSummaryCard";
import NeedAssistanceCard from "./NeedAssistanceCard";
import { getBookingById } from "@/lib/mock/bookings";
import { getPackageById, getVendorById } from "@/lib/mock/vendors";

export default function BookingDetailsScreen({ bookingId }: { bookingId: string }) {
  const booking = getBookingById(bookingId);
  if (!booking) notFound();

  const vendor = getVendorById(booking.vendorId);
  const pkg = getPackageById(booking.packageId);
  if (!vendor) notFound();

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-20 lg:pb-0">
      <BookingDetailsTopBar booking={booking} />

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
