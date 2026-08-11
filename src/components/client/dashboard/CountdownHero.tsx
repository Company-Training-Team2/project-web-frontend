import { EventSummary } from "@/services/event.service";

// Real data — EventDashboard.daysUntilEvent (GET /events/{id}/dashboard).
// The original mockup's Hours/Mins breakdown had no honest source (the
// backend only computes whole days), so this shows one real number instead
// of two invented ones.
export default function CountdownHero({ event, daysUntilEvent }: { event: EventSummary; daysUntilEvent: number }) {
  const label = daysUntilEvent > 0 ? "Days to go" : daysUntilEvent === 0 ? "Today!" : "Days ago";

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-4 text-center">
      <p className="text-[10px] font-semibold text-[#8B7E72] uppercase tracking-wide">{event.name}</p>

      <p className="text-5xl md:text-6xl font-serif font-bold text-[#A3391C] mt-3">
        {Math.abs(daysUntilEvent)}
      </p>
      <p className="text-[10px] text-[#8B716A] uppercase tracking-wide mt-1">{label}</p>

      <p className="text-xs md:text-sm text-[#8B716A] mt-4">
        {new Date(event.targetDate).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })} ·{" "}
        {event.location}
      </p>
    </div>
  );
}
