import { Building2, Camera, Flower2, Shirt } from "lucide-react";
import ExpenseCategoryCard, { ExpenseCategory } from "./ExpenseCategoryCard";

const categories: ExpenseCategory[] = [
  {
    id: "venue",
    icon: Building2,
    name: "Venue & Catering",
    spent: "$18,000",
    total: "$20,000",
    percent: 90,
    note: "Final payment due in 14 days",
    color: "#A3391C",
  },
  {
    id: "photography",
    icon: Camera,
    name: "Photography",
    spent: "$4,800",
    total: "$5,000",
    percent: 96,
    note: "Deposit paid · Portfolio confirmed",
    color: "#B08D3E",
  },
  {
    id: "floral",
    icon: Flower2,
    name: "Floral & Decor",
    spent: "$3,200",
    total: "$6,000",
    percent: 53,
    note: "Selection of centerpieces pending",
    color: "#1F7A4D",
  },
  {
    id: "attire",
    icon: Shirt,
    name: "Wedding Attire",
    spent: "$5,800",
    total: "$8,000",
    percent: 72,
    note: "Alterations appointment scheduled",
    color: "#1F7A4D",
  },
];

export default function ExpensesByCategory() {
  return (
    <div className="px-4 md:px-6 pt-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622]">
          Expenses by Category
        </h2>
        <button className="text-xs md:text-sm text-[#A3391C] font-medium whitespace-nowrap">
          Edit Allocations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((c) => (
          <ExpenseCategoryCard key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
}