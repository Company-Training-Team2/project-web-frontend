"use client";

import { useCallback, useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import AdminBottomNav from "@/components/layout/AdminBottomNav";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PaymentKpiCards from "@/components/admin/payments/PaymentKpiCards";
import PaymentLedgerTable from "@/components/admin/payments/PaymentLedgerTable";
import PayoutsCard from "@/components/admin/payments/PayoutsCard";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { adminService, AdminPaymentKpisDto } from "@/services/admin.service";

export default function AdminPaymentsPage() {
  useRequireAdminAuth();

  const [kpis, setKpis] = useState<AdminPaymentKpisDto | null>(null);

  const loadKpis = useCallback(() => {
    adminService
      .getPaymentKpis()
      .then(setKpis)
      .catch(() => setKpis(null));
  }, []);

  useEffect(() => {
    loadKpis();
  }, [loadKpis]);

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Search payments..." />

        <div className="mt-6">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622]">Payments</h1>
          <p className="mt-1 text-sm text-[#8B716A]">
            Global payment ledger, refunds, and vendor payouts.
          </p>
        </div>

        <PaymentKpiCards kpis={kpis} />
        <PayoutsCard />
        <PaymentLedgerTable onChanged={loadKpis} />
      </main>

      <AdminBottomNav />
    </div>
  );
}
