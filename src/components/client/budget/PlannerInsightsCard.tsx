import { Lightbulb, CheckCircle2 } from "lucide-react";
import { BudgetSummary } from "@/services/expense.service";

// Real data — GET /events/{id}/budget's pendingBudget (sum of Pending +
// Flagged expenses, not yet paid but committed/at-risk). The original
// mockup's category-reallocation tip had no real recommendation engine
// behind it, so this surfaces an honest real number instead.
export default function PlannerInsightsCard({ budget }: { budget: BudgetSummary }) {
  return (
    <div className="px-4 md:px-6 pt-8 pb-28 md:pb-8">
      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2">
          {budget.pendingBudget > 0 ? (
            <Lightbulb size={15} className="text-[#B08D3E]" />
          ) : (
            <CheckCircle2 size={15} className="text-[#1F7A4D]" />
          )}
          <h3 className="font-semibold text-sm text-[#2B2622]">Planner Insights</h3>
        </div>

        <p className="text-sm text-[#8B716A] leading-relaxed">
          {budget.pendingBudget > 0
            ? `EGP ${budget.pendingBudget.toLocaleString()} is still pending or flagged — not counted as spent yet, but worth settling before it's due.`
            : "No pending or flagged expenses right now — your budget is fully up to date."}
        </p>
      </div>
    </div>
  );
}
