"use client";

import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { adminService, AdminDashboardDto } from "@/services/admin.service";

// Real, callable endpoint — GET /api/admin/dashboard already returns
// totalUsers/totalVendors/totalCustomers; Admins = the remainder. There's no
// "Moderator"/"Support Agent" role on the backend (UserRole is only
// Customer/Vendor/Admin — see EventHub.Domain.Enums.UserRole), so those rows
// from the original mockup are dropped rather than faked.
export default function RolesAccessCard() {
  const [dashboard, setDashboard] = useState<AdminDashboardDto | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    adminService
      .getDashboard()
      .then(setDashboard)
      .catch(() => setFailed(true));
  }, []);

  const admins = dashboard ? dashboard.totalUsers - dashboard.totalCustomers - dashboard.totalVendors : null;

  const roles = [
    { label: "Administrators", count: admins },
    { label: "Vendors", count: dashboard?.totalVendors ?? null },
    { label: "Customers", count: dashboard?.totalCustomers ?? null },
  ];

  return (
    <div className="rounded-[16px] bg-[#1B2421] p-5 text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold">Roles &amp; Access</h3>
        <KeyRound size={18} className="text-white/60" />
      </div>

      <div className="mt-3 divide-y divide-white/10">
        {failed ? (
          <p className="py-2.5 text-sm text-white/60">Couldn&apos;t load role counts.</p>
        ) : (
          roles.map((role) => (
            <div key={role.label} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-white/80">{role.label}</span>
              <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs">
                {role.count ?? "…"}
              </span>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => toast.info("Permissions editor — not wired up yet.")}
        className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-medium text-[#1B2421] hover:bg-white/90"
      >
        Edit Permissions
      </button>
    </div>
  );
}
