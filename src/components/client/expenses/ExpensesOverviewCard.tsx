import { BudgetSummary } from "@/services/expense.service";

// Real data — GET /events/{id}/budget.
export default function ExpensesOverviewCard({ budget }: { budget: BudgetSummary }) {
  const percent = budget.totalBudget > 0 ? Math.min(100, Math.round((budget.spentBudget / budget.totalBudget) * 100)) : 0;

  return (
    <div className="px-4 md:px-6 pt-6">
      <p className="text-[10px] font-semibold text-[#A3391C] uppercase tracking-wide">Financial Overview</p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622] mt-1">Expenses</h1>

      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#2B2622]">Total Budget Used</span>
          <span className="font-bold text-lg text-[#A3391C]">{percent}%</span>
        </div>

        <div className="w-full bg-[#EDE0D2] rounded-full h-2 mt-3">
          <div className="bg-[#A3391C] h-2 rounded-full" style={{ width: `${percent}%` }} />
        </div>

        <div className="flex items-center justify-between text-xs text-[#8B716A] mt-2">
          <span>EGP {budget.spentBudget.toLocaleString()} Spent</span>
          <span>EGP {budget.totalBudget.toLocaleString()} Total</span>
        </div>
      </div>
    </div>
  );
}
