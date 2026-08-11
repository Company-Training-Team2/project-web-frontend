import Link from "next/link";
import { BudgetSummary } from "@/services/expense.service";

// Real data — GET /events/{id}/budget.
export default function BudgetOverviewCard({ eventId, budget }: { eventId: number; budget: BudgetSummary }) {
  const percent = budget.totalBudget > 0 ? Math.min(100, Math.round((budget.spentBudget / budget.totalBudget) * 100)) : 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="px-4 md:px-6 pt-6">
      <p className="text-[10px] font-semibold text-[#A3391C] uppercase tracking-wide">Financial Overview</p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622] mt-1">Budget Planner</h1>

      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-40 h-40 shrink-0">
            <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#EDE0D2" strokeWidth="12" />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#A3391C"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - percent / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#2B2622]">{percent}%</span>
              <span className="text-xs text-[#8B716A]">Used</span>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-1 gap-4 w-full">
            <div>
              <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">Total Budget</p>
              <p className="font-semibold text-sm md:text-base text-[#2B2622] mt-0.5">
                EGP {budget.totalBudget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">Remaining</p>
              <p className="font-semibold text-sm md:text-base text-green-700 mt-0.5">
                EGP {budget.remainingBudget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">Spent to Date</p>
              <p className="font-semibold text-sm md:text-base text-[#A3391C] mt-0.5">
                EGP {budget.spentBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`/event/expenses?id=${eventId}`}
          className="block w-full text-center bg-[#A3391C] text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 mt-5"
        >
          View Expense Ledger
        </Link>
      </div>
    </div>
  );
}
