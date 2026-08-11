"use client";

import { useEffect, useState } from "react";
import { Calendar, PartyPopper } from "lucide-react";
import { timelineService, TimelineMilestone } from "@/services/timeline.service";

// Real data — GET /events/{id}/timeline. Shows the first not-yet-completed
// milestone (the same "current step" rule the /event/timeline page uses).
export default function UpcomingMilestoneCard({ eventId }: { eventId: number }) {
  const [milestone, setMilestone] = useState<TimelineMilestone | null | undefined>(undefined);

  useEffect(() => {
    timelineService
      .getTimeline(eventId)
      .then((data) => setMilestone(data.milestones.find((m) => !m.isCompleted) ?? null))
      .catch(() => setMilestone(null));
  }, [eventId]);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="h-24 bg-gradient-to-br from-[#A3391C] to-[#5A1F0F]" />

      <div className="p-4 bg-[#A3391C] text-white">
        <p className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Upcoming Milestone</p>
        {milestone === undefined ? (
          <div className="mt-2 h-5 w-32 animate-pulse rounded bg-white/20" />
        ) : milestone === null ? (
          <div className="mt-1 flex items-center gap-2">
            <PartyPopper size={16} className="opacity-80" />
            <h3 className="font-serif font-bold text-lg">All milestones complete</h3>
          </div>
        ) : (
          <>
            <h3 className="font-serif font-bold text-lg mt-1">{milestone.label}</h3>
            {milestone.description ? <p className="text-xs opacity-80 mt-1">{milestone.description}</p> : null}
            {milestone.completedAt ? (
              <p className="flex items-center gap-1.5 text-xs opacity-80 mt-2">
                <Calendar size={12} />
                {new Date(milestone.completedAt).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
