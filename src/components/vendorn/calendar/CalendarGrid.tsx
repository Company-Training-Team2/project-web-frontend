"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { toDateOnlyString } from "@/lib/date";
import { AvailabilityDay, VendorBooking } from "@/services/vendorPortal.service";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const bookingDot: Record<string, string> = {
  Pending: "bg-yellow-500",
  Accepted: "bg-green-600",
  Paid: "bg-green-600",
  Completed: "bg-blue-600",
  Cancelled: "bg-[#8B716A]",
  Rejected: "bg-[#8B716A]",
};

export default function CalendarGrid({
  services,
  selectedWorkPostId,
  onSelectWorkPost,
  viewMonth,
  onMonthChange,
  availabilityDays,
  bookings,
  selectedDate,
  onSelectDate,
}: {
  services: { workPostId: number; workPostTitle: string }[];
  selectedWorkPostId: number | null;
  onSelectWorkPost: (id: number) => void;
  viewMonth: Date;
  onMonthChange: (date: Date) => void;
  availabilityDays: AvailabilityDay[];
  bookings: VendorBooking[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = toDateOnlyString(new Date());

  const blockedDates = new Set(
    availabilityDays.filter((d) => !d.isAvailable).map((d) => d.date)
  );
  const bookingsByDate = new Map<string, VendorBooking[]>();
  bookings.forEach((b) => {
    const list = bookingsByDate.get(b.bookingDate) ?? [];
    list.push(b);
    bookingsByDate.set(b.bookingDate, list);
  });

  const cells: { day: number; dateStr: string }[] = Array.from(
    { length: daysInMonth },
    (_, i) => {
      const dateStr = toDateOnlyString(new Date(year, month, i + 1));
      return { day: i + 1, dateStr };
    }
  );

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {services.length > 0 ? (
          <select
            value={selectedWorkPostId ?? ""}
            onChange={(e) => onSelectWorkPost(Number(e.target.value))}
            className="max-w-[220px] rounded-lg border border-[#DCCFC0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
          >
            {services.map((s) => (
              <option key={s.workPostId} value={s.workPostId}>
                {s.workPostTitle}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-xs text-[#8B7E72]">No services yet</span>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => onMonthChange(new Date(year, month - 1, 1))}
            className="text-[#8B716A] hover:text-[#2B2622]"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-[#2B2622] whitespace-nowrap">
            {viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => onMonthChange(new Date(year, month + 1, 1))}
            className="text-[#8B716A] hover:text-[#2B2622]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#2B2622]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#A3391C]/40" /> Blocked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> Pending booking
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-600" /> Confirmed booking
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 mt-4 text-center text-xs text-[#8B7E72] font-medium">
        {weekdays.map((d) => (
          <div key={d} className="pb-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstWeekday }, (_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {cells.map(({ day, dateStr }) => {
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          const isBlocked = blockedDates.has(dateStr);
          const dayBookings = bookingsByDate.get(dateStr) ?? [];
          const primaryBookingStatus = dayBookings[0]?.status;

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`
                relative h-14 md:h-16 rounded-lg flex flex-col items-center justify-center text-sm
                ${isSelected ? "bg-[#2B2622] text-white" : isBlocked ? "bg-[#A3391C]/10 text-[#2B2622]" : "text-[#2B2622] hover:bg-[#EDE0D2]"}
                ${isToday && !isSelected ? "ring-1 ring-[#A3391C]" : ""}
              `}
            >
              <span>{day}</span>
              {primaryBookingStatus && !isSelected && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${bookingDot[primaryBookingStatus] ?? "bg-[#8B716A]"}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
