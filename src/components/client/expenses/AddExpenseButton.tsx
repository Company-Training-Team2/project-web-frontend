import { Plus } from "lucide-react";

export default function AddExpenseButton() {
  return (
    <div className="px-4 md:px-6 pt-4">
      <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#DCCFC0] text-[#A3391C] rounded-xl py-3 text-sm font-semibold hover:bg-[#F6ECE0]">
        <Plus size={16} />
        Add Expense
      </button>
    </div>
  );
}