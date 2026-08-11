import { WorkPostPerformance } from "@/services/vendorPortal.service";

// Was a hardcoded "revenue by event category" breakdown — the backend has
// no event-category analytics, only per-service booking/revenue totals
// (WorkPostPerformance), so this shows each service's real share of total
// bookings instead.
export default function PerformanceIntelligence({ performance }: { performance: WorkPostPerformance[] }) {
  const totalBookings = performance.reduce((sum, p) => sum + p.totalBookings, 0);
  const top = [...performance].sort((a, b) => b.totalBookings - a.totalBookings).slice(0, 4);

  return (
    <div className="flex h-full flex-col rounded-[16px] bg-[#1B2421] p-4 text-white md:p-6">
      <h2 className="text-lg font-semibold">Performance Intelligence</h2>

      {top.length === 0 ? (
        <p className="mt-6 text-sm text-white/60">No bookings yet to break down.</p>
      ) : (
        <div className="mt-6 space-y-5">
          {top.map((p) => {
            const share = totalBookings > 0 ? Math.round((p.totalBookings / totalBookings) * 100) : 0;
            return (
              <div key={p.workPostId}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="truncate pr-2">{p.title}</span>
                  <span className="shrink-0">{share}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full bg-[#D97745]" style={{ width: `${share}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/70">
        {top.length > 0
          ? `"${top[0].title}" is your highest-booked service — consider featuring it more prominently on your storefront.`
          : "Once you have bookings, your best-performing service shows up here."}
      </div>
    </div>
  );
}
