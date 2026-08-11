"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { adminService, AdminReportDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

// Real, callable endpoint — GET /api/admin/reports/analytics's TopVendors.
// The original mockup's "Category Market Share" panel had no backing data
// (no category-of-booking breakdown anywhere on the backend) and was
// dropped rather than faked — this keeps only the half that's real.
export default function VendorsAndCategory() {
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
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-6 min-w-0">
      <h2 className="font-semibold text-xl text-[#2B2622] mb-4">Top Performing Vendors</h2>

      {status === "error" ? (
        <AdminConnectionError label="top vendors" />
      ) : status === "loading" || !report ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-[#EDE0D2]" />
          ))}
        </div>
      ) : report.topVendors.length === 0 ? (
        <p className="text-sm text-[#8B716A]">No completed bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {report.topVendors.map((v) => (
            <div key={v.vendorProfileId} className="flex items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#DCCFC0] shrink-0 grid place-items-center text-xs font-semibold text-[#5A4E43]">
                  {v.businessName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#2B2622] truncate">{v.businessName}</p>
                  <p className="text-xs text-[#8B7E72] flex items-center gap-1">
                    <Star size={10} className="fill-[#c59c42] text-[#c59c42]" />
                    {v.averageRating > 0 ? v.averageRating.toFixed(1) : "No ratings yet"} · {v.completedBookings} bookings
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-[#2B2622]">EGP {v.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
