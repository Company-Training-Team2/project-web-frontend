"use client";

import { useEffect, useState } from "react";
import { Users, Store, CalendarCheck, Wallet } from "lucide-react";
import { adminService, AdminDashboardDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

type Status = "loading" | "error" | "ready";

export default function StatsCards() {
  const [dashboard, setDashboard] = useState<AdminDashboardDto | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    adminService
      .getDashboard()
      .then((d) => {
        setDashboard(d);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "error") {
    return (
      <div className="mt-6">
        <AdminConnectionError label="platform stats" />
      </div>
    );
  }

  // GET /api/admin/dashboard doesn't break stats down by "today" — only
  // running totals and "this month" — so these are labeled for what the
  // backend actually computes rather than faking a daily figure.
  const stats = [
    { icon: Users, label: "Total Users", value: dashboard?.totalUsers.toLocaleString() },
    { icon: Store, label: "Total Vendors", value: dashboard?.totalVendors.toLocaleString() },
    { icon: CalendarCheck, label: "Bookings This Month", value: dashboard?.bookingsThisMonth.toLocaleString() },
    {
      icon: Wallet,
      label: "Revenue This Month",
      value: dashboard ? `EGP ${dashboard.revenueThisMonth.toLocaleString()}` : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#EDE0D2] flex items-center justify-center text-[#A3391C]">
              <stat.icon size={18} />
            </div>
          </div>

          <p className="text-xs md:text-sm text-[#8B716A] mt-3">
            {stat.label}
          </p>
          <h2 className="text-lg md:text-2xl font-bold mt-1 truncate text-[#2B2622]">
            {status === "loading" ? (
              <span className="inline-block h-6 w-16 animate-pulse rounded bg-[#DCCFC0]" />
            ) : (
              stat.value
            )}
          </h2>
        </div>
      ))}
    </div>
  );
}
