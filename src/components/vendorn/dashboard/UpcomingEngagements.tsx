import Link from "next/link";
import { parseDateOnly } from "@/lib/date";
import { UpcomingVendorBooking } from "@/services/vendorPortal.service";

const tagStyle: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Paid: "bg-green-100 text-green-700",
  Completed: "bg-[#DCE7E2] text-[#3F6656]",
};

export default function UpcomingEngagements({ bookings }: { bookings: UpcomingVendorBooking[] }) {
  return (
    <div className="mt-6 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-[#2B2622]">Upcoming Engagements</h2>
        <Link href="/vendor/bookings" className="text-xs font-medium text-[#A3391C] md:text-sm">
          View All
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p className="text-sm text-[#8B7E72]">Nothing on the calendar yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b.bookingId}
              className="overflow-hidden rounded-xl border border-[#DCCFC0] bg-white"
            >
              <div className="flex h-28 items-center justify-center bg-[#DCCFC0] font-serif text-2xl font-bold text-white/80">
                {b.workPostTitle?.[0]?.toUpperCase() ?? "E"}
              </div>

              <div className="p-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    tagStyle[b.status] ?? "bg-[#EDE0D2] text-[#8B7E72]"
                  }`}
                >
                  {b.status.toUpperCase()}
                </span>

                <h3 className="mt-2 text-sm font-medium text-[#2B2622]">{b.workPostTitle}</h3>
                <p className="mt-1 text-xs text-[#8B716A]">
                  {b.customerName} ·{" "}
                  {parseDateOnly(b.bookingDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
