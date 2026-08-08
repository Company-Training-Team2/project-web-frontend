import VendorSidebar from "@/components/layout/VendorSidebar";
import CalendarTopBar from "@/components/vendorn/calendar/CalendarTopBar";
import CalendarGrid from "@/components/vendorn/calendar/CalendarGrid";
import ManageDeskPanel from "@/components/vendorn/calendar/ManageDeskPanel";
import EarningsForecastCard from "@/components/vendorn/calendar/EarningsForecastCard";
import UpcomingEventsCard from "@/components/vendorn/calendar/UpcomingEventsCard";

export default function VendorCalendarPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <CalendarTopBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 min-w-0">
            <CalendarGrid />
          </div>

          <div className="flex flex-col gap-6 min-w-0">
            <ManageDeskPanel />
            <EarningsForecastCard />
            <UpcomingEventsCard />
          </div>
        </div>
      </main>
    </div>
  );
}