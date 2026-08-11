"use client";

import { Wallet, Landmark, Receipt, RotateCcw, AlertTriangle } from "lucide-react";
import { AdminPaymentKpisDto } from "@/services/admin.service";

// Real, callable endpoint — GET /api/admin/payments/kpis.
export default function PaymentKpiCards({ kpis }: { kpis: AdminPaymentKpisDto | null }) {
  const cards = [
    {
      icon: Wallet,
      label: "Total Revenue",
      value: kpis ? `EGP ${kpis.totalRevenue.toLocaleString()}` : undefined,
    },
    {
      icon: Landmark,
      label: "Platform Fees",
      value: kpis ? `EGP ${kpis.totalPlatformFees.toLocaleString()}` : undefined,
    },
    {
      icon: Receipt,
      label: "Total Transactions",
      value: kpis ? kpis.totalTransactions.toLocaleString() : undefined,
    },
    {
      icon: RotateCcw,
      label: "Refund Rate",
      value: kpis ? `${(kpis.refundRate * 100).toFixed(1)}%` : undefined,
    },
    {
      icon: AlertTriangle,
      label: "Failed Rate",
      value: kpis ? `${(kpis.failedTransactionRate * 100).toFixed(1)}%` : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mt-6">
      {cards.map((stat) => (
        <div key={stat.label} className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
          <div className="w-9 h-9 rounded-xl bg-[#EDE0D2] flex items-center justify-center text-[#A3391C]">
            <stat.icon size={16} />
          </div>
          <p className="text-xs md:text-sm text-[#8B716A] mt-3">{stat.label}</p>
          <h2 className="text-base md:text-xl font-bold mt-1 truncate text-[#2B2622]">
            {stat.value ?? <span className="inline-block h-5 w-14 animate-pulse rounded bg-[#DCCFC0]" />}
          </h2>
        </div>
      ))}
    </div>
  );
}
