"use client";

import { useMemo, useState } from "react";

import MyBookingsHeader from "./MyBookingsHeader";
import BookingFilterTabs, { BookingTab } from "./BookingFilterTabs";
import BookingCard from "./BookingCard";
import SparkleFab from "@/components/shared/SparkleFab";
import BottomNav from "@/components/shared/BottomNav";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { MOCK_BOOKINGS } from "@/lib/mock/bookings";
import { MockBooking } from "@/lib/mock/types";

const TAB_TO_STATUS: Record<BookingTab, MockBooking["status"][]> = {
  Upcoming: ["Confirmed", "Pending"],
  Ongoing: ["Confirmed"],
  Completed: ["Completed"],
  Cancelled: ["Cancelled", "Rejected"],
};

export default function MyBookingsScreen() {
  useRequireAuth();
  const [tab, setTab] = useState<BookingTab>("Upcoming");

  const bookings = useMemo(
    () => MOCK_BOOKINGS.filter((b) => TAB_TO_STATUS[tab].includes(b.status)),
    [tab]
  );

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-10">
      <MyBookingsHeader />

      <div className="mt-4 space-y-4">
        <BookingFilterTabs active={tab} onChange={setTab} />

        <div className="grid grid-cols-1 gap-4 px-5 pb-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {bookings.length === 0 ? (
            <p className="col-span-full py-10 text-center text-[14px] text-[#a79a90]">
              No {tab.toLowerCase()} bookings yet.
            </p>
          ) : (
            bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          )}
        </div>
      </div>

      <SparkleFab />
      <BottomNav active="bookings" />
    </div>
  );
}
