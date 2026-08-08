import ClientBottomNav from "@/components/layout/ClientBottomNav";
import ExpensesTopBar from "@/components/client/expenses/ExpensesTopBar";
import ExpensesOverviewCard from "@/components/client/expenses/ExpensesOverviewCard";
import AddExpenseButton from "@/components/client/expenses/AddExpenseButton";
import RecentTransactionsList from "@/components/client/expenses/RecentTransactionsList";

export default function ExpensesPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2]">
      <ExpensesTopBar />
      <ExpensesOverviewCard />
      <AddExpenseButton />
      <RecentTransactionsList />

      <ClientBottomNav />
    </div>
  );
}