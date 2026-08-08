import { LucideIcon } from "lucide-react";

export type TxStatus = "Paid" | "Pending" | "Overdue";

export type Transaction = {
  id: string;
  icon: LucideIcon;
  name: string;
  category: string;
  date: string;
  amount: string;
  status: TxStatus;
};

const statusStyles: Record<TxStatus, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-[#EDE0D2] text-[#B08D3E]",
  Overdue: "bg-red-100 text-red-600",
};

export default function TransactionItem({ tx }: { tx: Transaction }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
        <tx.icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-[#2B2622] truncate">
          {tx.name}
        </h3>
        <p className="text-xs text-[#8B716A] mt-0.5">
          {tx.category} · {tx.date}
        </p>
        <span
          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${statusStyles[tx.status]}`}
        >
          {tx.status}
        </span>
      </div>

      <span className="font-semibold text-sm text-[#2B2622] shrink-0">
        {tx.amount}
      </span>
    </div>
  );
}