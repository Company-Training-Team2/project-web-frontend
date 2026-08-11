"use client";

import { Suspense, useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { expenseService, BudgetSummary } from "@/services/expense.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import BudgetOverviewCard from "@/components/client/budget/BudgetOverviewCard";
import BudgetTopBar from "@/components/client/budget/BudgetTopBar";
import ExpensesByCategory from "@/components/client/budget/ExpensesByCategory";
import PlannerInsightsCard from "@/components/client/budget/PlannerInsightsCard";

function BudgetInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();
  const [budget, setBudget] = useState<BudgetSummary | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    if (!event) return;
    setBudgetStatus("loading");
    expenseService
      .getBudget(event.id)
      .then((data) => {
        setBudget(data);
        setBudgetStatus("ready");
      })
      .catch(() => setBudgetStatus("error"));
  }, [event]);

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <BudgetTopBar />

      {budgetStatus === "error" ? (
        <p className="mt-6 px-4 text-center text-sm text-[#8a3b3b]">Couldn&apos;t load this event&apos;s budget.</p>
      ) : budgetStatus === "loading" || !budget ? (
        <div className="mt-6 px-4 md:px-6 space-y-4">
          <div className="h-56 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
        </div>
      ) : (
        <>
          <BudgetOverviewCard eventId={event.id} budget={budget} />
          <ExpensesByCategory categories={budget.categoryBreakdown} />
          <PlannerInsightsCard budget={budget} />
        </>
      )}

      <ClientBottomNav />
    </div>
  );
}

export default function BudgetPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <BudgetInner />
    </Suspense>
  );
}
