import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import StatusPill from "@/components/shared/StatusPill";
import { MockBooking } from "@/lib/mock/types";

export default function BookingDetailsTopBar({ booking }: { booking: MockBooking }) {
  const dateLabel = new Date(booking.bookingDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border-b border-[#e5ded2] bg-[#faf6f0] px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
      <Link href="/bookings" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6d5d54] hover:text-[#af3718]">
        <ArrowLeft className="size-3.5" />
        Back to Dashboard
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-[22px] font-bold text-[#252323]">Booking #EH-{booking.id.toUpperCase()}</h1>
        <StatusPill variant={booking.status === "Confirmed" ? "success" : "neutral"}>{booking.status}</StatusPill>
        <span className="flex items-center gap-1 text-[13px] text-[#6d5d54]">
          <CalendarDays className="size-3.5" />
          {dateLabel}
        </span>
      </div>
    </div>
  );
}
