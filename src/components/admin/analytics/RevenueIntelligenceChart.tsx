"use client";

import { useEffect, useState } from "react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";
import MonthlyRevenueChart from "@/components/admin/shared/MonthlyRevenueChart";

// Real, callable endpoint — GET /api/admin/reports/analytics.
export default function RevenueIntelligenceChart() {
  const [report, setReport] = useState<AdminReportDto | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    adminService
      .getAnalyticsReport()
      .then((data) => {
        setReport(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold text-xl text-[#2B2622]">Revenue Intelligence</h2>
          <p className="text-sm text-[#8B716A] mt-1">Monthly revenue progression and platform commission.</p>
        </div>
        {report ? (
          <div className="text-right">
            <p className="text-lg font-bold text-[#2B2622]">EGP {report.revenueThisMonth.toLocaleString()}</p>
            <p className="text-xs text-[#8B716A]">this month</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 h-64">
        {status === "error" ? (
          <AdminConnectionError label="revenue intelligence" />
        ) : status === "loading" || !report ? (
          <div className="h-full animate-pulse rounded-xl bg-[#EDE0D2]" />
        ) : (
          <MonthlyRevenueChart data={report.monthlyRevenue} />
        )}
      </div>
    </div>
  );
}
