"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Download } from "lucide-react";
import { adminService, AdminDashboardDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

// GET /api/admin/dashboard has no historical time-series (no per-day/week
// revenue trend, no CLTV, no "platform rate" concept) — the original
// mockup's sparklines and %-change badges had nothing real behind them, so
// this shows plain current totals instead.
export default function AnalyticsHeader() {
  const [dashboard, setDashboard] = useState<AdminDashboardDto | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    adminService
      .getDashboard()
      .then((d) => {
        setDashboard(d);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const stats = [
    { label: "Total Revenue", value: dashboard ? `EGP ${dashboard.totalRevenue.toLocaleString()}` : undefined },
    { label: "Total Bookings", value: dashboard?.totalBookings.toLocaleString() },
    { label: "Total Vendors", value: dashboard?.totalVendors.toLocaleString() },
    { label: "Total Events", value: dashboard?.totalEvents.toLocaleString() },
  ];

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 mt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2622]">
            Platform Analytics
          </h1>
          <p className="mt-1 text-sm text-[#8B716A]">
            Executive intelligence dashboard &middot; Q3 fiscal review
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-[#DCCFC0] bg-white/60 px-4 py-2 text-sm text-[#2B2622] hover:bg-[#EDE0D2] transition">
            <CalendarDays size={16} />
            Past 30 Days
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#3F5B4E] px-4 py-2 text-sm text-white hover:bg-[#354e43] transition">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {status === "error" ? (
        <div className="mt-6">
          <AdminConnectionError label="platform analytics" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-[16px] border border-[#DCCFC0] p-4 min-w-0"
            >
              <span className="text-xs uppercase tracking-wide text-[#8B7E72]">
                {s.label}
              </span>

              <p className="mt-2 text-2xl font-bold text-[#2B2622]">
                {status === "loading" ? (
                  <span className="inline-block h-6 w-16 animate-pulse rounded bg-[#DCCFC0]" />
                ) : (
                  s.value
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
