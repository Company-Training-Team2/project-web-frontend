"use client";

import { Trash2 } from "lucide-react";
import { ChecklistItem } from "@/services/checklist.service";

const priorityStyles: Record<ChecklistItem["priority"], string> = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-[#EDE0D2] text-[#B08D3E]",
  Low: "bg-[#EDE0D2] text-[#8B716A]",
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  isBusy,
}: {
  task: ChecklistItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  isBusy?: boolean;
}) {
  const checked = task.isCompleted;

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 flex gap-3">
      <button
        onClick={() => onToggle(task.id)}
        disabled={isBusy}
        className={`w-5 h-5 rounded-md border-2 mt-0.5 shrink-0 flex items-center justify-center transition disabled:opacity-50
          ${checked ? "bg-[#1F7A4D] border-[#1F7A4D] text-white" : "border-[#DCCFC0]"}`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-sm font-medium ${checked ? "text-[#8B7E72] line-through" : "text-[#2B2622]"}`}>
            {task.title}
          </h3>

          {task.priority && !checked && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
          )}
        </div>

        {!checked && (
          <>
            {task.description ? <p className="text-xs text-[#8B716A] mt-1">{task.description}</p> : null}
            <div className="flex items-center gap-3 text-[10px] text-[#8B7E72] mt-2">
              {task.dueDate ? <span>Due {new Date(task.dueDate).toLocaleDateString()}</span> : null}
              {task.category && <span>{task.category}</span>}
            </div>
          </>
        )}

        {checked && task.updatedAt && (
          <p className="text-xs text-green-700 mt-1">✓ Completed {new Date(task.updatedAt).toLocaleDateString()}</p>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        disabled={isBusy}
        className="self-start text-[#8B7E72] hover:text-[#A3391C] shrink-0 disabled:opacity-50"
        aria-label="Delete task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
