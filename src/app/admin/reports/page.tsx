"use client";

import Sidebar from "@/components/layout/Sidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import StatsCards from "@/components/admin/reports/StatsCards";
import BottomSection from "@/components/admin/reports/BottomSection";
import RevenueChart from "@/components/admin/reports/RevenueChart";
import TopVendors from "@/components/admin/reports/TopVendors";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";

export default function ReportsPage() {
  useRequireAdminAuth();

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Search data points..." />
        <ReportsHeader />

        <StatsCards />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 min-w-0">
            <RevenueChart />
          </div>
          <div className="min-w-0">
            <TopVendors />
          </div>
        </section>

        <BottomSection />
      </main>
    </div>
  );
}
