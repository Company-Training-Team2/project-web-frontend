import { Utensils, Flower2, Music, Building2, Cake } from "lucide-react";
import TransactionItem, { Transaction } from "./TransactionItem";

const transactions: Transaction[] = [
  {
    id: "1",
    icon: Utensils,
    name: "The Grand Ballroom Catering",
    category: "Catering",
    date: "Apr 12, 2024",
    amount: "$4,250.00",
    status: "Paid",
  },
  {
    id: "2",
    icon: Flower2,
    name: "Wildflower Florals Co.",
    category: "Decoration",
    date: "Apr 10, 2024",
    amount: "$1,120.00",
    status: "Pending",
  },
  {
    id: "3",
    icon: Music,
    name: "Starlight Quartet",
    category: "Entertainment",
    date: "Apr 08, 2024",
    amount: "$850.00",
    status: "Paid",
  },
  {
    id: "4",
    icon: Building2,
    name: "Heritage Estate Deposit",
    category: "Venue",
    date: "Mar 25, 2024",
    amount: "$5,000.00",
    status: "Overdue",
  },
  {
    id: "5",
    icon: Cake,
    name: "Artisan Pastry House",
    category: "Catering",
    date: "Mar 25, 2024",
    amount: "$640.00",
    status: "Paid",
  },
];

export default function RecentTransactionsList() {
  return (
    <div className="px-4 md:px-6 pt-6 pb-28 md:pb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-[#2B2622]">Recent Transactions</h2>
        <span className="text-xs text-[#8B716A]">April 2024</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}