import TaskItem from "./TaskItem";
import { ChecklistItem } from "@/services/checklist.service";

export default function PendingTasksList({
  tasks,
  onToggle,
  onDelete,
  busyId,
}: {
  tasks: ChecklistItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  busyId: number | null;
}) {
  return (
    <div className="px-4 md:px-6 pt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-[#2B2622]">Pending Tasks</h2>
        <span className="text-xs text-[#8B716A]">({tasks.length})</span>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-[#8B716A]">No pending tasks — add one below.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} isBusy={busyId === t.id} />
          ))}
        </div>
      )}
    </div>
  );
}
