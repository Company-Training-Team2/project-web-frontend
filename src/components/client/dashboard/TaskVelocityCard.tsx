import Link from "next/link";

// Real data — EventDashboard (GET /events/{id}/dashboard). The original
// mockup's "Next task: ..." line had no source at this endpoint (it only
// returns totals, not individual items) — see /event/checklist for the
// actual task list instead of inventing one here.
export default function TaskVelocityCard({
  eventId,
  completedTasks,
  totalTasks,
}: {
  eventId: number;
  completedTasks: number;
  totalTasks: number;
}) {
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#2B2622]">Task Velocity</h2>
        <span className="text-sm text-[#8B716A]">
          {completedTasks} Completed / {totalTasks} Total
        </span>
      </div>

      <div className="w-full bg-[#EDE0D2] rounded-full h-2 mt-4">
        <div className="bg-[#A3391C] h-2 rounded-full" style={{ width: `${percent}%` }} />
      </div>

      <Link
        href={`/event/checklist?id=${eventId}`}
        className="inline-block text-xs text-[#A3391C] font-medium mt-3 hover:underline"
      >
        {totalTasks === 0 ? "Add your first task →" : "View checklist →"}
      </Link>
    </div>
  );
}
