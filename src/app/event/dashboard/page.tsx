"use client";

import { Suspense, useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { eventService, EventDashboard as EventDashboardData } from "@/services/event.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import EventDashboardTopBar from "@/components/client/dashboard/EventDashboardTopBar";
import CountdownHero from "@/components/client/dashboard/CountdownHero";
import BudgetCard from "@/components/client/dashboard/BudgetCard";
import TaskVelocityCard from "@/components/client/dashboard/TaskVelocityCard";
import GuestListCard from "@/components/client/dashboard/GuestListCard";
import UpcomingMilestoneCard from "@/components/client/dashboard/UpcomingMilestoneCard";
import UpcomingPaymentsCard from "@/components/client/dashboard/UpcomingPaymentsCard";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";

function EventDashboardInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();
  const [dashboard, setDashboard] = useState<EventDashboardData | null>(null);
  const [dashboardStatus, setDashboardStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    if (!event) return;
    setDashboardStatus("loading");
    eventService
      .getDashboard(event.id)
      .then((data) => {
        setDashboard(data);
        setDashboardStatus("ready");
      })
      .catch(() => setDashboardStatus("error"));
  }, [event]);

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <EventDashboardTopBar />

      <div className="px-4 md:px-6">
        {dashboardStatus === "error" ? (
          <p className="mt-6 text-center text-sm text-[#8a3b3b]">Couldn&apos;t load this event&apos;s dashboard.</p>
        ) : dashboardStatus === "loading" || !dashboard ? (
          <div className="mt-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
            ))}
          </div>
        ) : (
          <>
            <CountdownHero event={event} daysUntilEvent={dashboard.daysUntilEvent} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <BudgetCard
                totalBudget={dashboard.totalBudget}
                spentBudget={dashboard.spentBudget}
                remainingBudget={dashboard.remainingBudget}
              />
              <TaskVelocityCard
                eventId={event.id}
                completedTasks={dashboard.completedTasks}
                totalTasks={dashboard.totalTasks}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <GuestListCard
                confirmed={dashboard.confirmedGuests}
                pending={dashboard.pendingGuests}
                declined={dashboard.declinedGuests}
              />
              <UpcomingMilestoneCard eventId={event.id} />
            </div>

            <div className="mt-4 pb-4">
              <UpcomingPaymentsCard eventId={event.id} />
            </div>
          </>
        )}
      </div>

      <ClientBottomNav />
    </div>
  );
}

export default function EventDashboardPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <EventDashboardInner />
    </Suspense>
  );
}
