"use client";

import Sidebar from "@/components/layout/Sidebar";
import AnalyticsTopBar from "@/components/admin/analytics/AnalyticsTopBar";
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import RevenueIntelligenceChart from "@/components/admin/analytics/RevenueIntelligenceChart";
import VendorsAndCategory from "@/components/admin/analytics/VendorsAndCategory";
import FunnelAndTraffic from "@/components/admin/analytics/FunnelAndTraffic";
import GlobalFootprintChart from "@/components/admin/analytics/GlobalFootprintChart";
import AnalyticsFooter from "@/components/admin/analytics/AnalyticsFooter";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";

export default function AnalyticsPage() {
  useRequireAdminAuth();

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AnalyticsTopBar />
        <AnalyticsHeader />
        <RevenueIntelligenceChart />
        <VendorsAndCategory />
        <FunnelAndTraffic />
        <GlobalFootprintChart />
        <AnalyticsFooter />
      </main>
    </div>
  );
}
