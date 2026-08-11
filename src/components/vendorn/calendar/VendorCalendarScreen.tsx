"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import {
  vendorPortalService,
  getVendorPortalErrorMessage,
  VendorAvailability,
  VendorBooking,
} from "@/services/vendorPortal.service";

import CalendarTopBar from "./CalendarTopBar";
import CalendarGrid from "./CalendarGrid";
import ManageDeskPanel from "./ManageDeskPanel";
import EarningsForecastCard from "./EarningsForecastCard";
import UpcomingEventsCard from "./UpcomingEventsCard";

export default function VendorCalendarScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();

  const [availabilities, setAvailabilities] = useState<VendorAvailability[] | null>(null);
  const [bookings, setBookings] = useState<VendorBooking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selectedWorkPostId, setSelectedWorkPostId] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const load = () => {
    setError(null);
    Promise.all([vendorPortalService.getAvailability(), vendorPortalService.getBookings()])
      .then(([availabilityRes, bookingsRes]) => {
        setAvailabilities(availabilityRes);
        setBookings(bookingsRes);
        setSelectedWorkPostId((prev) => prev ?? availabilityRes[0]?.workPostId ?? null);
      })
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load your calendar.")));
  };

  useEffect(() => {
    if (!isVendor) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isVendor]);

  const services = useMemo(
    () => (availabilities ?? []).map((a) => ({ workPostId: a.workPostId, workPostTitle: a.workPostTitle })),
    [availabilities]
  );

  const selectedAvailability = useMemo(
    () => availabilities?.find((a) => a.workPostId === selectedWorkPostId) ?? null,
    [availabilities, selectedWorkPostId]
  );

  const bookingsForSelectedService = useMemo(
    () => bookings.filter((b) => b.workPostId === selectedWorkPostId),
    [bookings, selectedWorkPostId]
  );

  const monthLabel = viewMonth.toLocaleDateString(undefined, { month: "long" });
  const bookingsInViewMonth = useMemo(() => {
    const prefix = `${viewMonth.getFullYear()}-${String(viewMonth.getMonth() + 1).padStart(2, "0")}`;
    return bookingsForSelectedService.filter((b) => b.bookingDate.startsWith(prefix));
  }, [bookingsForSelectedService, viewMonth]);

  if (authLoading || !isVendor) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <CalendarTopBar />

        {error ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : !availabilities ? (
          <div className="mt-6 flex items-center justify-center gap-2 py-24 text-[#8B7E72]">
            <Loader2 className="size-5 animate-spin" />
            Loading calendar…
          </div>
        ) : services.length === 0 ? (
          <div className="mt-6 rounded-[16px] border border-dashed border-[#DCCFC0] py-16 text-center text-sm text-[#8B7E72]">
            Add a service first to manage its availability calendar.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 min-w-0">
              <CalendarGrid
                services={services}
                selectedWorkPostId={selectedWorkPostId}
                onSelectWorkPost={setSelectedWorkPostId}
                viewMonth={viewMonth}
                onMonthChange={setViewMonth}
                availabilityDays={selectedAvailability?.days ?? []}
                bookings={bookingsForSelectedService}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            <div className="flex flex-col gap-6 min-w-0">
              <ManageDeskPanel workPostId={selectedWorkPostId} onUpdated={load} />
              <EarningsForecastCard bookings={bookingsInViewMonth} monthLabel={monthLabel} />
              <UpcomingEventsCard bookings={bookingsForSelectedService} />
            </div>
          </div>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
