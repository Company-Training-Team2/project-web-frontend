import Sidebar from "@/components/layout/Sidebar";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import StatsCards from "@/components/admin/reports/StatsCards";
import BottomSection from "@/components/admin/reports/BottomSection";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EB] flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <ReportsHeader />

        <StatsCards />

        <BottomSection />
      </main>
    </div>
  );
}