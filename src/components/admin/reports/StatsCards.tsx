"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { adminService, AdminDashboardDto } from "@/services/admin.service";

// GET /api/admin/dashboard has no historical/trend data (no prior-period
// comparison, no refund tracking) — the original mockup's %-change badges
// and mini bar charts had nothing real to back them, so this shows plain
// current totals instead of inventing trends.
export default function StatsCards() {
  const [dashboard, setDashboard] = useState<AdminDashboardDto | null>(null);

  useEffect(() => {
    adminService.getDashboard().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  const avgBooking =
    dashboard && dashboard.totalBookings > 0 ? dashboard.totalRevenue / dashboard.totalBookings : null;

  const cards = [
    { title: "Total Revenue", value: dashboard ? `EGP ${dashboard.totalRevenue.toLocaleString()}` : "—" },
    { title: "Avg. Booking Value", value: avgBooking !== null ? `EGP ${avgBooking.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—" },
    { title: "Active Vendors", value: dashboard ? dashboard.totalVendors.toLocaleString() : "—" },
    { title: "Total Bookings", value: dashboard ? dashboard.totalBookings.toLocaleString() : "—" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#F6ECE0] border border-[#DCCFC0] rounded-[16px] p-5 min-w-0"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8B716A]">
              {card.title}
            </span>

            <TrendingUp
              size={16}
              className="text-[#A3391C]"
            />
          </div>

          <h2 className="text-3xl font-bold mt-3 text-[#2B2622]">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
