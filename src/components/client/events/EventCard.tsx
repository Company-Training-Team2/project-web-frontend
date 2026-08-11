import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { EventSummary, EventDashboard } from "@/services/event.service";

// Real data — EventSummary (GET /events) plus an optional per-event
// EventDashboard (GET /events/{id}/dashboard) for the progress bar and
// budget line. The original mockup's star rating had no backing field
// (events aren't rated), so it's dropped rather than faked.
export default function EventCard({ event, dashboard }: { event: EventSummary; dashboard?: EventDashboard }) {
  const progress = dashboard && dashboard.totalTasks > 0 ? Math.round((dashboard.completedTasks / dashboard.totalTasks) * 100) : null;

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="relative h-40 bg-[#DCCFC0]">
        <span className="absolute top-3 left-3 text-[10px] font-semibold bg-[#F6ECE0] text-[#2B2622] px-2.5 py-1 rounded-full">
          {event.eventType}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-[#2B2622]">{event.name}</h3>

        <div className="flex items-center gap-4 text-xs text-[#8B716A] mt-2">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {new Date(event.targetDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {event.guestCount} Guests
          </span>
        </div>

        {progress !== null ? (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#8B7E72]">Planning Progress</span>
              <span className="font-semibold text-[#A3391C]">{progress}%</span>
            </div>
            <div className="w-full bg-[#EDE0D2] rounded-full h-1.5">
              <div className="bg-[#A3391C] h-1.5 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#DCCFC0]">
          <div>
            <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">Budget</p>
            <p className="text-sm font-semibold text-[#2B2622] mt-0.5">
              {dashboard
                ? `EGP ${dashboard.spentBudget.toLocaleString()} / ${dashboard.totalBudget.toLocaleString()}`
                : `EGP ${event.totalBudget.toLocaleString()}`}
            </p>
          </div>

          <Link
            href={`/event/dashboard?id=${event.id}`}
            className="bg-[#A3391C] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 whitespace-nowrap"
          >
            Manage Event
          </Link>
        </div>
      </div>
    </div>
  );
}
