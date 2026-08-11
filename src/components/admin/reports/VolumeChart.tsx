"use client";

import { useEffect, useState } from "react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Real, callable endpoint — GET /api/admin/reports/analytics's
// MonthlyRevenue[].bookingCount. Only one real period exists (no
// prior-period series), so the "Previous vs Current" comparison badge from
// the original mockup is dropped along with the two invented series.
export default function VolumeChart() {
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

  const data = report
    ? [...report.monthlyRevenue]
        .sort((a, b) => a.year - b.year || a.month - b.month)
        .map((m) => ({ month: MONTH_LABELS[m.month - 1] ?? String(m.month), value: m.bookingCount }))
    : [];
  const maxValue = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[300px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl text-gray-900">Volume Intelligence</h2>
          <p className="text-gray-400 text-sm">Monthly booking volume</p>
        </div>
      </div>

      {status === "error" ? (
        <AdminConnectionError label="booking volume" />
      ) : status === "loading" ? (
        <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
      ) : data.length === 0 ? (
        <p className="flex h-40 items-center justify-center text-sm text-gray-400">No bookings recorded yet.</p>
      ) : (
        <div className="grid gap-4 items-end h-40 pt-4" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
          {data.map((item, index) => {
            const heightPercent = Math.round((item.value / maxValue) * 100);
            const isLast = index === data.length - 1;
            return (
              <div key={item.month + index} className="flex flex-col items-center h-full justify-end group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-gray-800 text-white py-0.5 px-1.5 rounded mb-1">
                  {item.value}
                </div>
                <div
                  className={`w-8 rounded-t-lg transition-all duration-300 ${isLast ? "bg-[#B84E22]" : "bg-gray-200"}`}
                  style={{ height: `${Math.max(heightPercent, 3)}%` }}
                />
                <span className={`text-xs font-medium mt-3 ${isLast ? "text-[#B84E22] font-bold" : "text-gray-400"}`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
