import { Utensils, Music } from "lucide-react";

const payments = [
  {
    icon: Utensils,
    label: "Catering Balance",
    due: "Due in 3 days",
    amount: "$4,200",
  },
  {
    icon: Music,
    label: "Entertainment Deposit",
    due: "Due in 12 days",
    amount: "$850",
  },
];

export default function UpcomingPaymentsCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Upcoming Payments</h2>

      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
              <p.icon size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2B2622] truncate">
                {p.label}
              </p>
              <p className="text-xs text-[#8B716A]">{p.due}</p>
            </div>

            <span className="font-semibold text-sm text-[#A3391C] shrink-0">
              {p.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}