import { Wallet, CheckCircle2, Star, TrendingUp } from "lucide-react";
import { VendorAnalytics } from "@/services/vendorPortal.service";

export default function StatsCards({ analytics }: { analytics: VendorAnalytics }) {
  const stats = [
    {
      icon: Wallet,
      label: "REVENUE THIS MONTH",
      value: `EGP ${analytics.revenueThisMonth.toLocaleString()}`,
      note: `EGP ${analytics.totalRevenue.toLocaleString()} all-time`,
    },
    {
      icon: CheckCircle2,
      label: "COMPLETED BOOKINGS",
      value: String(analytics.completedBookings),
      note: `of ${analytics.totalBookings} total`,
    },
    {
      icon: Star,
      label: "AVERAGE RATING",
      value: analytics.averageRating.toFixed(1),
      note: `${analytics.reviewCount} review${analytics.reviewCount === 1 ? "" : "s"}`,
    },
    {
      icon: TrendingUp,
      label: "CONV. RATE",
      value: `${analytics.conversionRate.toFixed(1)}%`,
      note: "inquiry-to-booking ratio",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium tracking-wide text-[#8B7E72] md:text-xs">{stat.label}</p>
            <stat.icon size={15} className="text-[#A3391C]" />
          </div>

          <h2 className="mt-2 text-lg font-bold text-[#2B2622] md:text-2xl">{stat.value}</h2>
          <p className="mt-1 text-[10px] text-[#8B716A] md:text-xs">{stat.note}</p>
        </div>
      ))}
    </div>
  );
}
