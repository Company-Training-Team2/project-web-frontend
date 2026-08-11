import { Star } from "lucide-react";
import { VendorDashboard } from "@/services/vendorPortal.service";

// Was a hardcoded testimonial quote — the dashboard endpoint doesn't return
// individual review text, only the aggregate rating/count, so this shows
// that honestly instead of inventing a quote.
export default function TestimonialCard({ dashboard }: { dashboard: VendorDashboard }) {
  return (
    <div className="mt-6 rounded-[16px] bg-[#1B2421] p-5 text-white md:p-6">
      <div className="mb-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={13}
            className={
              n <= Math.round(dashboard.averageRating)
                ? "fill-[#D97745] text-[#D97745]"
                : "fill-transparent text-white/30"
            }
          />
        ))}
        <span className="ml-1 text-sm font-semibold">{dashboard.averageRating.toFixed(1)}</span>
      </div>

      <p className="text-sm leading-relaxed text-white/80">
        {dashboard.reviewCount > 0
          ? `Rated across ${dashboard.reviewCount} client review${dashboard.reviewCount === 1 ? "" : "s"} — keep up the momentum by delivering every booking on your calendar.`
          : "No reviews yet — your first completed booking is the first step toward building your reputation here."}
      </p>

      <p className="mt-4 text-xs text-white/50">
        {dashboard.completedBookings} completed booking{dashboard.completedBookings === 1 ? "" : "s"} to date
      </p>
    </div>
  );
}
