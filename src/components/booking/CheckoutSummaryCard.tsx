import { CalendarDays, MapPin, Users } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MockVendor, MockPackage } from "@/lib/mock/types";

export default function CheckoutSummaryCard({
  vendor,
  pkg,
  bookingDate,
  guestCount,
}: {
  vendor: MockVendor;
  pkg?: MockPackage;
  bookingDate?: string;
  guestCount?: number;
}) {
  const dateLabel = bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  return (
    <div className="px-5 lg:px-10">
      <SectionEyebrow>Your Reservation</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Booking Details</h3>

      <div className="mt-3 flex items-center gap-4 rounded-[14px] border border-[#e5ded2] bg-white p-4">
        <div className="size-16 shrink-0 rounded-[10px] bg-[#e9dfd1] sm:size-20" />
        <div className="min-w-0">
          <p className="truncate font-serif text-[16px] font-bold text-[#252323] sm:text-[18px]">
            {vendor.businessName}
          </p>
          {pkg ? (
            <p className="truncate text-[11px] font-bold uppercase tracking-[0.04em] text-[#af3718]">{pkg.name}</p>
          ) : null}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#6d5d54]">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {dateLabel}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3.5" />
              {guestCount ?? "—"} Guests
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {vendor.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
