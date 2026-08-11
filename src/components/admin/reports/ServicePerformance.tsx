"use client";

import { useEffect, useState } from "react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

// Real, callable endpoint — GET /api/admin/reports/analytics's
// BookingCompletionRate + CancelledBookings/TotalBookings. The original
// mockup's "Re-Booking Rate / Returning Clients" ring had no backing
// metric (no repeat-customer tracking on the backend), so this shows the
// cancellation rate instead — a real number computed from the same totals.
export default function ServicePerformance() {
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

  const cancellationRate = report && report.totalBookings > 0 ? report.cancelledBookings / report.totalBookings : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
      <h2 className="font-bold text-xl mb-8">Service Performance</h2>

      {status === "error" ? (
        <AdminConnectionError label="service performance" />
      ) : status === "loading" || !report ? (
        <div className="flex justify-around">
          {[0, 1].map((i) => (
            <div key={i} className="size-24 animate-pulse rounded-full bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-[8px] border-green-500 flex items-center justify-center">
              <span className="font-bold text-2xl">{Math.round(report.bookingCompletionRate * 100)}%</span>
            </div>
            <p className="mt-4 font-semibold">Completion Rate</p>
            <span className="text-sm text-gray-500">
              {report.completedBookings} of {report.totalBookings} bookings
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-[8px] border-orange-500 flex items-center justify-center">
              <span className="font-bold text-2xl">{Math.round(cancellationRate * 100)}%</span>
            </div>
            <p className="mt-4 font-semibold">Cancellation Rate</p>
            <span className="text-sm text-gray-500">{report.cancelledBookings} cancelled</span>
          </div>
        </div>
      )}
    </div>
  );
}
