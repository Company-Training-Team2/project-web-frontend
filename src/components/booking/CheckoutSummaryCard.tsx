import { CalendarDays, Users } from "lucide-react";
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
    ? new Date(bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "—";

  return (
    <div className="mx-5 flex items-center gap-3 rounded-[14px] border border-[#e5ded2] bg-white p-3 lg:mx-10">
      <div className="size-14 shrink-0 rounded-[10px] bg-[#e9dfd1]" />
      <div className="min-w-0">
        <p className="truncate font-serif text-[15px] font-bold text-[#252323]">{vendor.businessName}</p>
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.04em] text-[#af3718]">
          {pkg?.name ?? "Package"}
        </p>
        <div className="mt-1 flex items-center gap-3 text-[12px] text-[#6d5d54]">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {dateLabel}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {guestCount ?? "—"} guests
          </span>
        </div>
      </div>
    </div>
  );
}
