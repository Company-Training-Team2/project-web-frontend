import { Check } from "lucide-react";
import { MockBooking, MockPackage } from "@/lib/mock/types";

const INCLUSIONS = ["4-Course Gourmet Dinner", "Champagne Reception", "Premium Wine Service", "Customized Floral Decor"];

export default function PackageServicesCard({ booking, pkg }: { booking: MockBooking; pkg?: MockPackage }) {
  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-[18px] font-bold text-[#252323]">Package &amp; Services</h3>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.06em] text-[#a79a90]">Guest Count</p>
          <p className="text-[14px] font-bold text-[#252323]">{booking.guestCount} Guests</p>
        </div>
      </div>

      <p className="mt-3 font-serif text-[16px] font-bold text-[#af3718]">{pkg?.name ?? "Signature Banquet Package"}</p>
      <p className="mt-1 text-[13px] leading-[1.5] text-[#6d5d54]">
        {pkg?.description ??
          "A comprehensive luxury dining experience including a four-course seasonal menu, premium wine pairings, and bespoke table styling."}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {INCLUSIONS.map((item) => (
          <p key={item} className="flex items-center gap-1.5 text-[13px] text-[#252323]">
            <Check className="size-3.5 shrink-0 text-[#af3718]" />
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
