import TransactionItem from "./TransactionItem";
import { Expense } from "@/services/expense.service";

export default function RecentTransactionsList({
  transactions,
  onDelete,
  busyId,
}: {
  transactions: Expense[];
  onDelete: (id: number) => void;
  busyId: number | null;
}) {
  return (
    <div className="px-4 md:px-6 pt-6 pb-28 md:pb-8">
      <h2 className="font-semibold text-[#2B2622] mb-3">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-sm text-[#8B716A]">No expenses recorded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} isBusy={busyId === tx.id} />
          ))}
        </div>
      )}
    </div>
  );
}
