"use client";

import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { expenseService, Expense } from "@/services/expense.service";

// Real data — GET /events/{id}/expenses, filtered to Status == "Pending".
// The original mockup's "Due in N days" copy had no due-date concept on
// Expense (only a single `date`), so this shows the expense date instead.
export default function UpcomingPaymentsCard({ eventId }: { eventId: number }) {
  const [pending, setPending] = useState<Expense[] | null>(null);

  useEffect(() => {
    expenseService
      .getExpenses(eventId)
      .then((expenses) =>
        setPending(
          expenses
            .filter((e) => e.status === "Pending")
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 4)
        )
      )
      .catch(() => setPending([]));
  }, [eventId]);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Upcoming Payments</h2>

      {pending === null ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-9 animate-pulse rounded-lg bg-[#EDE0D2]" />
          ))}
        </div>
      ) : pending.length === 0 ? (
        <p className="text-sm text-[#8B716A]">No pending payments.</p>
      ) : (
        <div className="space-y-3">
          {pending.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
                <CreditCard size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2B2622] truncate">{p.description}</p>
                <p className="text-xs text-[#8B716A]">{new Date(p.date).toLocaleDateString()}</p>
              </div>

              <span className="font-semibold text-sm text-[#A3391C] shrink-0">EGP {p.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
