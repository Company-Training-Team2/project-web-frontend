import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { UpcomingVendorBooking } from "@/services/vendorPortal.service";

// Was a hardcoded "recent enquiries" list — there's no per-listing
// "enquiries" concept on the backend (Messages, see VendorMessagingScreen,
// is real now but organized by conversation, not by enquiry), so this
// shows real upcoming bookings instead, which the dashboard endpoint
// actually provides.
export default function RecentEnquiries({ bookings }: { bookings: UpcomingVendorBooking[] }) {
  const recent = bookings.slice(0, 3);

  return (
    <div className="mt-6 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
      <h2 className="mb-4 text-sm font-semibold text-[#2B2622]">Upcoming Bookings</h2>

      {recent.length === 0 ? (
        <p className="text-xs text-[#8B7E72]">No upcoming bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {recent.map((b) => (
            <div key={b.bookingId} className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#A3391C]/10 text-xs font-bold text-[#A3391C]">
                {b.customerName?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#2B2622]">{b.customerName}</p>
                <p className="truncate text-xs text-[#8B716A]">{b.workPostTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/vendor/bookings"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A3391C] py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        <ClipboardList size={14} />
        View All Bookings
      </Link>
    </div>
  );
}
