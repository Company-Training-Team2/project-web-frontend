"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

// Real, callable endpoint — GET /api/admin/reports/analytics's TopVendors
// (ranked by completed-booking revenue).
export default function TopVendors() {
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
    <div className="bg-white rounded-2xl shadow-sm p-5 h-[440px] overflow-y-auto">
      <h2 className="font-bold text-lg">Market Leaders</h2>

      {status === "error" ? (
        <div className="mt-4">
          <AdminConnectionError label="top vendors" />
        </div>
      ) : status === "loading" || !report ? (
        <div className="space-y-4 mt-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : report.topVendors.length === 0 ? (
        <p className="mt-5 text-sm text-gray-500">No completed bookings yet.</p>
      ) : (
        <div className="space-y-4 mt-5">
          {report.topVendors.map((vendor) => (
            <div key={vendor.vendorProfileId} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 shrink-0 rounded-full bg-gray-200 grid place-items-center text-xs font-semibold text-gray-600">
                  {vendor.businessName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{vendor.businessName}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Star size={11} className="fill-[#c59c42] text-[#c59c42]" />
                    {vendor.averageRating > 0 ? vendor.averageRating.toFixed(1) : "No ratings yet"}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[#C75B29] font-semibold">EGP {vendor.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{vendor.completedBookings} bookings</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
