"use client";

import Sidebar from "@/components/layout/Sidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import StatsCards from "@/components/admin/reports/StatsCards";
import BottomSection from "@/components/admin/reports/BottomSection";
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

        <BottomSection />
      </main>
    </div>
  );
}
