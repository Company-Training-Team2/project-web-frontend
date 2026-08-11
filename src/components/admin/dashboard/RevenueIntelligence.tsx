"use client";

import { useEffect, useState } from "react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";
import MonthlyRevenueChart from "@/components/admin/shared/MonthlyRevenueChart";

// Real, callable endpoint — GET /api/admin/reports/analytics. Was a dead
// "Revenue Chart" placeholder box; now the real monthly gross-revenue /
// commission series (same data source as the Reports page's Revenue
// Dossier).
export default function RevenueIntelligence() {
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
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-[#2B2622]">Revenue Intelligence</h2>
          <p className="text-xs md:text-sm text-[#8B716A] mt-1">Monthly revenue and commission trend.</p>
        </div>
      </div>

      <div className="mt-6 h-56 md:h-72">
        {status === "error" ? (
          <AdminConnectionError label="the revenue trend" />
        ) : status === "loading" || !report ? (
          <div className="h-full animate-pulse rounded-xl bg-[#EDE0D2]" />
        ) : (
          <MonthlyRevenueChart data={report.monthlyRevenue} />
        )}
      </div>
    </div>
  );
}
