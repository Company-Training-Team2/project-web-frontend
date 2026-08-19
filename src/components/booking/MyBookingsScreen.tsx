"use client";

import { useEffect, useMemo, useState } from "react";
import { WifiOff } from "lucide-react";

import MyBookingsHeader from "./MyBookingsHeader";
import BookingFilterTabs, { BookingTab } from "./BookingFilterTabs";
import BookingCard from "./BookingCard";
import SparkleFab from "@/components/shared/SparkleFab";
import BottomNav from "@/components/shared/BottomNav";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { bookingService } from "@/services/booking.service";
import { MockBooking } from "@/lib/mock/types";

// Was ["Confirmed", "Pending"] / ["Confirmed"] — "Confirmed" hasn't been a
// real BookingStatus value since it was renamed to "Accepted" (audit Module
// 8), and "Paid" wasn't listed anywhere either, so any real
// vendor-accepted or paid booking matched none of these tabs and just
// disappeared from My Bookings entirely.
const TAB_TO_STATUS: Record<BookingTab, MockBooking["status"][]> = {
  Upcoming: ["Accepted", "Paid", "Pending"],
  Ongoing: ["Accepted", "Paid"],
  Completed: ["Completed"],
  Cancelled: ["Cancelled", "Rejected"],
};

export default function MyBookingsScreen() {
  useRequireAuth();
  const [tab, setTab] = useState<BookingTab>("Upcoming");
  const [allBookings, setAllBookings] = useState<MockBooking[] | undefined>(undefined);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    bookingService.getMyBookings().then(({ bookings, isLive: live }) => {
      setAllBookings(bookings);
      setIsLive(live);
    });
  }, []);

  const bookings = useMemo(
    () => (allBookings ?? []).filter((b) => TAB_TO_STATUS[tab].includes(b.status)),
    [allBookings, tab]
  );

  if (allBookings === undefined) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-10">
      <div className="mx-auto w-full max-w-6xl">
        <MyBookingsHeader />

        <div className="mt-4 space-y-4">
          <BookingFilterTabs active={tab} onChange={setTab} />

          {!isLive ? (
            <div className="mx-4 flex items-center gap-2 rounded-[12px] border border-[#e3aea0] bg-[#fbeee9] px-4 py-3 text-[13px] text-[#8a3b3b] sm:mx-5 lg:mx-10">
              <WifiOff size={15} className="shrink-0" />
              Couldn&apos;t reach the server — showing sample bookings below, not your real ones.
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 px-4 pb-6 sm:grid-cols-2 sm:px-5 lg:grid-cols-3 lg:px-10 xl:grid-cols-4">
            {bookings.length === 0 ? (
              <p className="col-span-full py-10 text-center text-[14px] text-[#a79a90]">
                No {tab.toLowerCase()} bookings yet.
              </p>
            ) : (
              bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            )}
          </div>
        </div>
      </div>

      <SparkleFab />
      <BottomNav active="bookings" />
    </div>
  );
}
