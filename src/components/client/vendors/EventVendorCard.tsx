import Link from "next/link";
import { EventVendor } from "@/services/event.service";

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  Confirmed: { label: "Booked", className: "bg-[#1F7A4D] text-white" },
  Completed: { label: "Completed", className: "bg-[#1F7A4D] text-white" },
  Pending: { label: "Awaiting Reply", className: "bg-[#B08D3E] text-white" },
  Cancelled: { label: "Cancelled", className: "bg-[#8B716A] text-white" },
  Rejected: { label: "Declined", className: "bg-[#8B716A] text-white" },
};

// Real data — GET /events/{id}/vendors.
export default function EventVendorCard({ vendor }: { vendor: EventVendor }) {
  const badge = STATUS_BADGE[vendor.bookingStatus] ?? { label: vendor.bookingStatus, className: "bg-[#8B716A] text-white" };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="relative h-40 bg-[#DCCFC0]">
        <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mt-1">
          <h3 className="font-serif font-semibold text-[#2B2622]">{vendor.vendorName}</h3>
          <span className="font-semibold text-sm text-[#A3391C]">EGP {vendor.amount.toLocaleString()}</span>
        </div>
        <p className="text-xs text-[#8B7E72] mt-1">
          {vendor.serviceTitle} · {new Date(vendor.bookingDate).toLocaleDateString()}
        </p>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/vendors/${vendor.vendorProfileId}`}
            className="flex-1 text-center bg-[#A3391C] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90"
          >
            View Vendor
          </Link>
          <Link
            href={`/bookings/${vendor.bookingId}`}
            className="flex-1 text-center border border-[#DCCFC0] text-[#2B2622] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2]"
          >
            Booking Details
          </Link>
        </div>
      </div>
    </div>
  );
}
