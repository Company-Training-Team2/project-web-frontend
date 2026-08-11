import { Link2, Trash2, Wallet } from "lucide-react";
import { Expense } from "@/services/expense.service";

const statusStyles: Record<Expense["status"], string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-[#EDE0D2] text-[#B08D3E]",
  Flagged: "bg-red-100 text-red-600",
};

export default function TransactionItem({
  tx,
  onDelete,
  isBusy,
}: {
  tx: Expense;
  onDelete: (id: number) => void;
  isBusy?: boolean;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
        {tx.isSystemGenerated ? <Link2 size={16} /> : <Wallet size={16} />}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-[#2B2622] truncate">{tx.description}</h3>
        <p className="text-xs text-[#8B716A] mt-0.5">
          {tx.category} · {new Date(tx.date).toLocaleDateString()}
          {tx.isSystemGenerated ? " · From booking" : ""}
        </p>
        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${statusStyles[tx.status]}`}>
          {tx.status}
        </span>
      </div>

      <span className="font-semibold text-sm text-[#2B2622] shrink-0">EGP {tx.amount.toLocaleString()}</span>

      {!tx.isSystemGenerated ? (
        <button
          onClick={() => onDelete(tx.id)}
          disabled={isBusy}
          className="text-[#8B7E72] hover:text-[#A3391C] shrink-0 disabled:opacity-50"
          aria-label="Delete expense"
        >
          <Trash2 size={14} />
        </button>
      ) : null}
    </div>
  );
}
