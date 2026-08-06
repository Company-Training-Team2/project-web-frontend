import Sidebar from "@/components/layout/Sidebar";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import StatsCards from "@/components/admin/reports/StatsCards";
import BottomSection from "@/components/admin/reports/BottomSection";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <ReportsHeader />

        <StatsCards />

        <BottomSection />
      </main>
    </div>
  );
}