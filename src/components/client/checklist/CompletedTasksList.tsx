import TaskItem, { Task } from "./TaskItem";

const tasks: Task[] = [
  {
    id: "c1",
    title: "Book Grand Ballroom",
    detail: "",
    due: "",
    completedNote: "Completed Aug 12",
  },
  {
    id: "c2",
    title: "Select Theme Palette",
    detail: "",
    due: "",
    completedNote: "Completed Aug 05",
  },
];

export default function CompletedTasksList() {
  return (
    <div className="px-4 md:px-6 pt-6 pb-28 md:pb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-[#2B2622]">Completed</h2>
        <span className="text-xs text-[#8B716A]">(24)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}