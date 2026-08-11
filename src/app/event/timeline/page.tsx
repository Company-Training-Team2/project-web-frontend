"use client";

import { Suspense, useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { timelineService, EventTimeline } from "@/services/timeline.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import NeedHelpCard from "@/components/client/timeline/NeedHelpCard";
import TimelineHeader from "@/components/client/timeline/TimelineHeader";
import TimelineStep, { Step, StepStatus } from "@/components/client/timeline/TimelineStep";
import TimelineTopBar from "@/components/client/timeline/TimelineTopBar";

function TimelineInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();
  const [timeline, setTimeline] = useState<EventTimeline | null>(null);
  const [timelineStatus, setTimelineStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    if (!event) return;
    setTimelineStatus("loading");
    timelineService
      .getTimeline(event.id)
      .then((data) => {
        setTimeline(data);
        setTimelineStatus("ready");
      })
      .catch(() => setTimelineStatus("error"));
  }, [event]);

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  // The first not-yet-completed milestone is the "current" step — every
  // milestone after it is "upcoming". Mirrors the backend's own ordering
  // (TimelineResponse.Milestones is already sequential).
  const firstIncompleteIndex = timeline?.milestones.findIndex((m) => !m.isCompleted) ?? -1;
  const steps: Step[] =
    timeline?.milestones.map((m, i) => {
      const stepStatus: StepStatus = m.isCompleted ? "completed" : i === firstIncompleteIndex ? "current" : "upcoming";
      return {
        id: m.key,
        status: stepStatus,
        title: m.label,
        description:
          m.description ??
          (m.isCompleted && m.completedAt
            ? `Completed ${new Date(m.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
            : ""),
      };
    }) ?? [];

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <TimelineTopBar />
      <TimelineHeader eventName={event.name} />

      <div className="px-4 md:px-6 pt-6">
        {timelineStatus === "error" ? (
          <p className="text-center text-sm text-[#8a3b3b] py-6">Couldn&apos;t load this event&apos;s timeline.</p>
        ) : timelineStatus === "loading" ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
            ))}
          </div>
        ) : steps.length === 0 ? (
          <p className="text-center text-sm text-[#8B716A] py-6">No milestones yet.</p>
        ) : (
          <div>
            {steps.map((step, i) => (
              <TimelineStep key={step.id} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>
        )}
      </div>

      <NeedHelpCard />
      <ClientBottomNav />
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <TimelineInner />
    </Suspense>
  );
}
