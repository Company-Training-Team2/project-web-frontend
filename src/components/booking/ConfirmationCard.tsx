import { CalendarDays, MapPin } from "lucide-react";
import { MockVendor, MockPackage } from "@/lib/mock/types";

export default function ConfirmationCard({
  vendor,
  pkg,
  bookingDate,
  guestCount,
  total,
  confirmationCode,
}: {
  vendor: MockVendor;
  pkg?: MockPackage;
  bookingDate?: string;
  guestCount?: number;
  total: number;
  confirmationCode: string;
}) {
  const dateLabel = bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  return (
    <div className="mx-auto max-w-[360px] rounded-[16px] border border-[#e5ded2] bg-white p-5 text-left">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#a79a90]">Confirmation</p>
        <p className="text-[12px] font-bold text-[#252323]">#{confirmationCode}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-serif text-[18px] font-bold text-[#252323]">{pkg?.name ?? "Package"}</p>
        <p className="text-[17px] font-bold text-[#252323]">EGP {total.toLocaleString()}</p>
      </div>

      <div className="mt-3 space-y-1.5 text-[13px] text-[#6d5d54]">
        <p className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {dateLabel} • {guestCount ?? "—"} guests
        </p>
        <p className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {vendor.businessName}, {vendor.city}
        </p>
      </div>
    </div>
  );
}
