import ClientBottomNav from "@/components/layout/ClientBottomNav";
import EventDashboardTopBar from "@/components/client/dashboard/EventDashboardTopBar";
import CountdownHero from "@/components/client/dashboard/CountdownHero";
import BudgetCard from "@/components/client/dashboard/BudgetCard";
import TaskVelocityCard from "@/components/client/dashboard/TaskVelocityCard";
import GuestListCard from "@/components/client/dashboard/GuestListCard";
import UpcomingMilestoneCard from "@/components/client/dashboard/UpcomingMilestoneCard";
import UpcomingPaymentsCard from "@/components/client/dashboard/UpcomingPaymentsCard";

export default function EventDashboardPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <EventDashboardTopBar />

      <div className="px-4 md:px-6">
        <CountdownHero />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          <BudgetCard />
          <TaskVelocityCard />
          <GuestListCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <UpcomingMilestoneCard />
          <UpcomingPaymentsCard />
        </div>
      </div>

      <ClientBottomNav />
    </div>
  );
}