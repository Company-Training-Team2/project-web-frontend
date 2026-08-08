import VendorSidebar from "@/components/layout/VendorSidebar";
import DashboardTopBar from "@/components/vendorn/dashboard/DashboardTopBar";
import GreetingHeader from "@/components/vendorn/dashboard/GreetingHeader";
import QuickActions from "@/components/vendorn/dashboard/QuickActions";
import UpcomingEngagements from "@/components/vendorn/dashboard/UpcomingEngagements";
import TestimonialCard from "@/components/vendorn/dashboard/TestimonialCard";
import AvailabilityMini from "@/components/vendorn/dashboard/AvailabilityMini";
import RecentEnquiries from "@/components/vendorn/dashboard/RecentEnquiries";

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <DashboardTopBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3 md:mt-0">
          <div className="lg:col-span-2 min-w-0">
            <GreetingHeader />
            <QuickActions />
            <UpcomingEngagements />
            <TestimonialCard />
          </div>

          <div className="min-w-0">
            <AvailabilityMini />
            <RecentEnquiries />
          </div>
        </div>
      </main>
    </div>
  );
}