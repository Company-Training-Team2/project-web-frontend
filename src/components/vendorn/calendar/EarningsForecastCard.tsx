import { VendorBooking } from "@/services/vendorPortal.service";

const CONFIRMED_STATUSES = new Set(["Accepted", "Paid", "Completed"]);

export default function EarningsForecastCard({
  bookings,
  monthLabel,
}: {
  bookings: VendorBooking[];
  monthLabel: string;
}) {
  const confirmed = bookings
    .filter((b) => CONFIRMED_STATUSES.has(b.status))
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const pending = bookings
    .filter((b) => b.status === "Pending")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <p className="text-xs text-[#8B7E72]">{monthLabel} Forecast</p>
      <p className="text-2xl font-bold text-[#A3391C] mt-1">
        EGP {(confirmed + pending).toLocaleString()}
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[#8B716A]">Confirmed Earnings</span>
          <span className="font-medium text-[#2B2622]">EGP {confirmed.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#8B716A]">Pending Potential</span>
          <span className="font-medium text-[#2B2622]">EGP {pending.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
