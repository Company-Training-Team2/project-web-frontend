import TaskItem, { Task } from "./TaskItem";

const tasks: Task[] = [
  {
    id: "1",
    title: "Confirm Catering Menu",
    detail:
      "Finalize the selection for the main course and appetizers with 'The Golden Plate' team.",
    due: "Sep 15",
    priority: "High",
    meta: "Vendors",
  },
  {
    id: "2",
    title: "Send Digital Invitations",
    detail:
      "Batch send the final version of the invitations to all confirmed guestlist contacts.",
    due: "Tomorrow",
    priority: "Medium",
    meta: "Guests",
  },
  {
    id: "3",
    title: "Finalize Floral Arrangements",
    detail: "",
    due: "Oct 02",
    priority: "Low",
  },
];

export default function PendingTasksList() {
  return (
    <div className="px-4 md:px-6 pt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-[#2B2622]">Pending Tasks</h2>
        <span className="text-xs text-[#8B716A]">({tasks.length})</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}