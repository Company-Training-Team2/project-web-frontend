import Link from "next/link";
import { MessageSquare, Star } from "lucide-react";

import StatusPill from "@/components/shared/StatusPill";
import { getCategoryById } from "@/lib/mock/categories";
import { getVendorById } from "@/lib/mock/vendors";
import { MockBooking } from "@/lib/mock/types";

const STATUS_STYLE: Record<MockBooking["status"], { label: string; variant: "success" | "warning" | "neutral" }> = {
  Confirmed: { label: "Confirmed", variant: "success" },
  Pending: { label: "Action Required", variant: "warning" },
  Completed: { label: "Completed", variant: "neutral" },
  Cancelled: { label: "Cancelled", variant: "neutral" },
  Rejected: { label: "Rejected", variant: "neutral" },
};

export default function BookingCard({ booking }: { booking: MockBooking }) {
  const vendor = getVendorById(booking.vendorId);
  if (!vendor) return null;
  const category = getCategoryById(vendor.categoryId);
  const status = STATUS_STYLE[booking.status];

  const dateLabel = new Date(booking.bookingDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#e5ded2] bg-white">
      <div className="relative h-36 w-full bg-[#e9dfd1]">
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[12px] font-bold text-[#252323]">
          <Star className="size-3 fill-[#c59c42] text-[#c59c42]" />
          {vendor.rating.toFixed(1)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#af3718]">
            {category?.name ?? "Vendor"}
          </p>
          <StatusPill variant={status.variant}>{status.label}</StatusPill>
        </div>

        <h3 className="mt-1 font-serif text-[18px] font-bold text-[#252323]">{vendor.businessName}</h3>

        <div className="mt-2 space-y-1 text-[13px] text-[#6d5d54]">
          <p>{dateLabel}</p>
          <p>{vendor.city}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/bookings/${booking.id}`}
            className="h-10 flex-1 rounded-[8px] bg-[#af3718] text-center text-[13px] font-bold leading-10 text-white transition hover:bg-[#9f3216]"
          >
            View Details
          </Link>
          <button
            aria-label="Message vendor"
            className="grid size-10 shrink-0 place-items-center rounded-[8px] border border-[#e5ded2] text-[#6d5d54]"
          >
            <MessageSquare className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
