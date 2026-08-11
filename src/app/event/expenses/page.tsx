"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { expenseService, BudgetSummary, Expense, CreateExpensePayload } from "@/services/expense.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import AddExpenseButton from "@/components/client/expenses/AddExpenseButton";
import ExpensesOverviewCard from "@/components/client/expenses/ExpensesOverviewCard";
import ExpensesTopBar from "@/components/client/expenses/ExpensesTopBar";
import RecentTransactionsList from "@/components/client/expenses/RecentTransactionsList";

function ExpensesInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();

  const [budget, setBudget] = useState<BudgetSummary | null>(null);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [dataStatus, setDataStatus] = useState<"loading" | "error" | "ready">("loading");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const load = useCallback((eventId: number) => {
    setDataStatus("loading");
    Promise.all([expenseService.getBudget(eventId), expenseService.getExpenses(eventId)])
      .then(([b, e]) => {
        setBudget(b);
        setExpenses(e.slice().sort((a, c) => new Date(c.date).getTime() - new Date(a.date).getTime()));
        setDataStatus("ready");
      })
      .catch(() => setDataStatus("error"));
  }, []);

  useEffect(() => {
    if (event) load(event.id);
  }, [event, load]);

  const handleAdd = async (payload: CreateExpensePayload) => {
    if (!event) return;
    setIsAdding(true);
    try {
      await expenseService.addExpense(event.id, payload);
      load(event.id);
      toast.success("Expense added.");
    } catch {
      toast.error("Couldn't add that expense.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!event) return;
    setBusyId(id);
    try {
      await expenseService.deleteExpense(id);
      load(event.id);
    } catch {
      toast.error("Couldn't delete that expense.");
    } finally {
      setBusyId(null);
    }
  };

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <ExpensesTopBar />

      {dataStatus === "error" ? (
        <p className="mt-6 px-4 text-center text-sm text-[#8a3b3b]">Couldn&apos;t load expenses for this event.</p>
      ) : dataStatus === "loading" || !budget || !expenses ? (
        <div className="mt-6 px-4 md:px-6">
          <div className="h-40 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
        </div>
      ) : (
        <>
          <ExpensesOverviewCard budget={budget} />
          <AddExpenseButton onAdd={handleAdd} isSubmitting={isAdding} />
          <RecentTransactionsList transactions={expenses} onDelete={handleDelete} busyId={busyId} />
        </>
      )}

      <ClientBottomNav />
    </div>
  );
}

export default function ExpensesPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <ExpensesInner />
    </Suspense>
  );
}
