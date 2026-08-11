import Link from "next/link";
import { parseDateOnly, toDateOnlyString } from "@/lib/date";
import { VendorBooking } from "@/services/vendorPortal.service";

const tagColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Paid: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-[#EDE0D2] text-[#8B716A]",
  Rejected: "bg-[#EDE0D2] text-[#8B716A]",
};

export default function UpcomingEventsCard({ bookings }: { bookings: VendorBooking[] }) {
  const todayStr = toDateOnlyString(new Date());
  const upcoming = bookings
    .filter((b) => b.bookingDate >= todayStr && b.status !== "Cancelled" && b.status !== "Rejected")
    .sort((a, b) => a.bookingDate.localeCompare(b.bookingDate))
    .slice(0, 5);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">Upcoming Events</h2>
        <Link href="/vendor/bookings" className="text-xs font-medium text-[#A3391C]">
          View All
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <p className="text-xs text-[#8B7E72]">No upcoming bookings.</p>
      ) : (
        <div className="space-y-3">
          {upcoming.map((b) => {
            const date = parseDateOnly(b.bookingDate);
            return (
              <div key={b.id} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#EDE0D2] flex flex-col items-center justify-center text-[10px] font-semibold text-[#A3391C] leading-tight text-center shrink-0 whitespace-pre-line">
                  {date.toLocaleDateString(undefined, { month: "short" }).toUpperCase()}
                  {"\n"}
                  {date.getDate()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2B2622] truncate">{b.workPostTitle}</p>
                  <p className="text-xs text-[#8B716A] truncate">{b.customerName}</p>
                </div>

                <span
                  className={`text-[10px] font-medium px-2 py-1 rounded-full shrink-0 ${
                    tagColor[b.status] ?? "bg-[#EDE0D2] text-[#8B716A]"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
