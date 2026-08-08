import ClientBottomNav from "@/components/layout/ClientBottomNav";
import BudgetTopBar from "@/components/client/budget/BudgetTopBar";
import BudgetOverviewCard from "@/components/client/budget/BudgetOverviewCard";
import ExpensesByCategory from "@/components/client/budget/ExpensesByCategory";
import PlannerInsightsCard from "@/components/client/budget/PlannerInsightsCard";
import { Sparkles } from "lucide-react";

export default function BudgetPlannerPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] relative">
      <BudgetTopBar />
      <BudgetOverviewCard />
      <ExpensesByCategory />
      <PlannerInsightsCard />

      <button className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-[#A3391C] text-white flex items-center justify-center shadow-lg hover:opacity-90 z-30">
        <Sparkles size={20} />
      </button>

      <ClientBottomNav />
    </div>
  );
}