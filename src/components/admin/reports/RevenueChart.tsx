"use client";

import { useEffect, useState } from "react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";
import MonthlyRevenueChart from "@/components/admin/shared/MonthlyRevenueChart";

// Real, callable endpoint — GET /api/admin/reports/analytics.
export default function RevenueChart() {
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
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[440px] flex flex-col">
      <h2 className="text-xl font-bold text-[#2E2E2E]">Revenue Dossier</h2>
      <p className="text-gray-500 text-sm mt-1">Monthly gross revenue and platform commission.</p>

      <div className="mt-4 flex-1">
        {status === "error" ? (
          <AdminConnectionError label="the revenue chart" />
        ) : status === "loading" || !report ? (
          <div className="h-full animate-pulse rounded-xl bg-[#FBF7F2]" />
        ) : (
          <MonthlyRevenueChart data={report.monthlyRevenue} />
        )}
      </div>

      {report ? (
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#8B716A]">
          <span>
            Total Revenue: <strong className="text-[#2E2E2E]">EGP {report.totalRevenue.toLocaleString()}</strong>
          </span>
          <span>
            Total Commission: <strong className="text-[#2E2E2E]">EGP {report.totalCommissionEarned.toLocaleString()}</strong>
          </span>
        </div>
      ) : null}
    </div>
  );
}
