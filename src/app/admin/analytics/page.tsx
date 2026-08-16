"use client";

import Sidebar from "@/components/layout/Sidebar";
import AdminBottomNav from "@/components/layout/AdminBottomNav";
import AdminTopBar from "@/components/admin/AdminTopBar";
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import RevenueIntelligenceChart from "@/components/admin/analytics/RevenueIntelligenceChart";
import VendorsAndCategory from "@/components/admin/analytics/VendorsAndCategory";
import AnalyticsFooter from "@/components/admin/analytics/AnalyticsFooter";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";

export default function AnalyticsPage() {
  useRequireAdminAuth();

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Global Search..." />
        <AnalyticsHeader />
        <RevenueIntelligenceChart />
        <VendorsAndCategory />
        <AnalyticsFooter />
      </main>

      <AdminBottomNav />
    </div>
  );
}
