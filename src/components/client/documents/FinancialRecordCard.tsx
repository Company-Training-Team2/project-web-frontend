import { Wallet, Zap, Download, CheckCircle2 } from "lucide-react";

const records = [
  {
    icon: Zap,
    name: "Lumiere Lighting Final",
    note: "Due Oct 30, 2023",
    amount: "$4,250.00",
    status: "due",
  },
  {
    icon: CheckCircle2,
    name: "Bakery Deposit",
    note: "Paid Sep 15, 2023",
    amount: "$1,200.00",
    status: "paid",
  },
];

export default function FinancialRecordCard() {
  return (
    <div className="px-4 md:px-6 pt-6 pb-6">
      <div className="flex items-center gap-2 mb-3">
        <Wallet size={15} className="text-[#A3391C]" />
        <h2 className="font-semibold text-[#2B2622]">Financial Records</h2>
      </div>

      <div className="space-y-3">
        {records.map((r) => (
          <div
            key={r.name}
            className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DCCFC0] flex items-center justify-center shrink-0">
                <r.icon
                  size={16}
                  className={
                    r.status === "due" ? "text-[#A3391C]" : "text-green-700"
                  }
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-sm text-[#2B2622] truncate">
                  {r.name}
                </h3>
                <p className="text-xs text-[#8B716A] mt-0.5">{r.note}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p
                className={`font-semibold text-sm ${
                  r.status === "due" ? "text-[#A3391C]" : "text-[#2B2622]"
                }`}
              >
                {r.amount}
              </p>
              {r.status === "due" ? (
                <button className="text-xs font-medium bg-[#A3391C] text-white rounded-lg px-3 py-1 mt-1 hover:opacity-90">
                  Pay
                </button>
              ) : (
                <button className="flex items-center gap-1 text-xs text-[#8B716A] hover:text-[#2B2622] mt-1">
                  <Download size={11} />
                  View Receipt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}