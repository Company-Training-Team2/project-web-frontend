import { LucideIcon } from "lucide-react";

export type ExpenseCategory = {
  id: string;
  icon: LucideIcon;
  name: string;
  spent: string;
  total: string;
  percent: number;
  note: string;
  color: string;
};

export default function ExpenseCategoryCard({
  category,
}: {
  category: ExpenseCategory;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
            <category.icon size={16} />
          </div>
          <h3 className="font-medium text-sm text-[#2B2622] truncate">
            {category.name}
          </h3>
        </div>

        <span className="text-sm font-semibold text-[#2B2622] shrink-0 whitespace-nowrap">
          {category.spent} / {category.total}
        </span>
      </div>

      <div className="w-full bg-[#EDE0D2] rounded-full h-1.5 mt-3">
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${category.percent}%`, backgroundColor: category.color }}
        />
      </div>

      <p className="text-xs text-[#8B716A] mt-2">{category.note}</p>
    </div>
  );
}