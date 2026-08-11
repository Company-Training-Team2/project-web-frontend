import { Tag } from "lucide-react";
import { CategoryBreakdownItem } from "@/services/expense.service";

const COLORS = ["#A3391C", "#B08D3E", "#1F7A4D", "#3F5B4E", "#8B716A"];

// Real data — GET /events/{id}/budget's CategoryBreakdown. Categories are
// free-text on the backend (whatever the customer typed when adding an
// expense), so a generic tag icon is used instead of guessing per-category
// icons.
export default function ExpensesByCategory({ categories }: { categories: CategoryBreakdownItem[] }) {
  return (
    <div className="px-4 md:px-6 pt-8">
      <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622] mb-3">Expenses by Category</h2>

      {categories.length === 0 ? (
        <p className="text-sm text-[#8B716A]">No paid expenses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((c, i) => (
            <div key={c.category} className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
                    <Tag size={16} />
                  </div>
                  <h3 className="font-medium text-sm text-[#2B2622] truncate">{c.category}</h3>
                </div>
                <span className="text-sm font-semibold text-[#2B2622] shrink-0 whitespace-nowrap">
                  EGP {c.amount.toLocaleString()}
                </span>
              </div>

              <div className="w-full bg-[#EDE0D2] rounded-full h-1.5 mt-3">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${c.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }}
                />
              </div>

              <p className="text-xs text-[#8B716A] mt-2">{c.percentage.toFixed(0)}% of spent budget</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
