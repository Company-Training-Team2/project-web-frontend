"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminService, AdminVendorDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function RecentVendorApprovals() {
  const [approvals, setApprovals] = useState<AdminVendorDto[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    adminService
      .getPendingVendors()
      .then((vendors) => {
        setApprovals(vendors.slice(0, 5));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">
          Recent Vendor Approvals
        </h2>
        <Link href="/admin/vendors" className="text-xs md:text-sm text-[#A3391C] font-medium">
          View All
        </Link>
      </div>

      {status === "error" ? (
        <AdminConnectionError label="vendor approvals" />
      ) : status === "loading" ? (
        <p className="py-6 text-center text-sm text-[#8B7E72]">Loading…</p>
      ) : approvals.length === 0 ? (
        <p className="py-6 text-center text-sm text-[#8B7E72]">No pending vendor approvals.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="md:hidden space-y-3">
            {approvals.map((a) => (
              <div
                key={a.vendorProfileId}
                className="border border-[#DCCFC0] rounded-xl p-3 flex gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-xs font-semibold text-[#8B716A] shrink-0">
                  {initials(a.businessName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#2B2622] text-sm truncate">
                    {a.businessName}
                  </p>
                  <p className="text-xs text-[#8B716A]">{a.city ?? "—"}</p>
                  <p className="text-xs text-[#8B7E72]">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href="/admin/vendors"
                  className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-3 py-1.5 h-fit text-[#2B2622] hover:bg-[#EDE0D2] shrink-0"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead className="text-left text-[#8B7E72] text-xs uppercase tracking-wide">
                <tr>
                  <th className="pb-3">Business Name</th>
                  <th className="pb-3">City</th>
                  <th className="pb-3">Date Applied</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((a) => (
                  <tr key={a.vendorProfileId} className="border-t border-[#DCCFC0]">
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-xs font-semibold text-[#8B716A]">
                        {initials(a.businessName)}
                      </div>
                      <div>
                        <p className="font-medium text-[#2B2622]">{a.businessName}</p>
                        <p className="text-xs text-[#8B716A]">{a.email}</p>
                      </div>
                    </td>
                    <td className="text-[#8B716A] text-sm">{a.city ?? "—"}</td>
                    <td className="text-[#8B7E72] text-sm">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        href="/admin/vendors"
                        className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-3 py-1.5 text-[#2B2622] hover:bg-[#EDE0D2]"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
