import VendorSidebar from "@/components/layout/VendorSidebar";
import AnalyticsTopBar from "@/components/vendorn/analytics/AnalyticsTopBar";
import StatsCards from "@/components/vendorn/analytics/StatsCards";
import RevenueGrowthChart from "@/components/vendorn/analytics/RevenueGrowthChart";
import PerformanceIntelligence from "@/components/vendorn/analytics/PerformanceIntelligence";
import HighPerformingPackages from "@/components/vendorn/analytics/HighPerformingPackages";
import PremiumClientele from "@/components/vendorn/analytics/PremiumClientele";

export default function VendorAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AnalyticsTopBar />
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 min-w-0">
          <div className="lg:col-span-2 min-w-0">
            <RevenueGrowthChart />
          </div>
          <div className="min-w-0">
            <PerformanceIntelligence />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 min-w-0">
          <div className="lg:col-span-2 min-w-0">
            <HighPerformingPackages />
          </div>
          <div className="min-w-0">
            <PremiumClientele />
          </div>
        </div>
      </main>
    </div>
  );
}