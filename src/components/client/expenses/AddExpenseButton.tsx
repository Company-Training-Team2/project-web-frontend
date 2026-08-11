"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { CreateExpensePayload } from "@/services/expense.service";

export default function AddExpenseButton({
  onAdd,
  isSubmitting,
}: {
  onAdd: (payload: CreateExpensePayload) => void;
  isSubmitting: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [status, setStatus] = useState<"Paid" | "Pending" | "Flagged">("Pending");

  const reset = () => {
    setCategory("");
    setDescription("");
    setAmount("");
    setStatus("Pending");
    setIsOpen(false);
  };

  const submit = () => {
    if (!category.trim() || !description.trim() || amount === "" || Number(amount) <= 0) return;
    onAdd({ category: category.trim(), description: description.trim(), amount: Number(amount), status });
    reset();
  };

  if (!isOpen) {
    return (
      <div className="px-4 md:px-6 pt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#DCCFC0] text-[#A3391C] rounded-xl py-3 text-sm font-semibold hover:bg-[#F6ECE0]"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 pt-4">
      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2B2622]">New Expense</h3>
          <button onClick={reset} className="text-[#8B716A] hover:text-[#2B2622]">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (e.g. Catering)"
            className="h-10 rounded-lg border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Amount (EGP)"
            className="h-10 rounded-lg border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="h-10 w-full rounded-lg border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="h-10 w-full rounded-lg border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Flagged">Flagged</option>
        </select>

        <button
          onClick={submit}
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#A3391C] py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Adding…" : "Add Expense"}
        </button>
      </div>
    </div>
  );
}
