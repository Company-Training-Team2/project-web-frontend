import Sidebar from "@/components/layout/Sidebar";
import DashboardTopBar from "@/components/admin/dashboard/DashboardTopBar";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import StatsCards from "@/components/admin/dashboard/StatsCards";
import RevenueIntelligence from "@/components/admin/dashboard/RevenueIntelligence";
import SystemHealthStatus from "@/components/admin/dashboard/SystemHealthStatus";
import RecentVendorApprovals from "@/components/admin/dashboard/RecentVendorApprovals";
import QuickActions from "@/components/admin/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EB] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <DashboardTopBar />
        <DashboardHeader />
        <StatsCards />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 min-w-0">
          <div className="md:col-span-2 min-w-0">
            <RevenueIntelligence />
          </div>
          <div className="min-w-0">
            <SystemHealthStatus />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 min-w-0">
          <div className="md:col-span-2 min-w-0">
            <RecentVendorApprovals />
          </div>
          <div className="min-w-0">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}