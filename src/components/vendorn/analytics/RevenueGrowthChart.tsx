"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { MonthlyRevenue } from "@/services/vendorPortal.service";

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export default function RevenueGrowthChart({ monthlyRevenue }: { monthlyRevenue: MonthlyRevenue[] }) {
  // Backend only returns the current period's revenue-by-month (no
  // prior-year series to compare against), so this shows one real line
  // instead of the two-line current-vs-previous comparison the original
  // mock had — that second line had no honest data source.
  const data = [...monthlyRevenue]
    .sort((a, b) => a.year - b.year || a.month - b.month)
    .map((m) => ({ month: MONTH_LABELS[m.month - 1] ?? String(m.month), revenue: m.revenue }));

  return (
    <div className="h-full rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-[#2B2622]">Revenue Growth</h2>
          <p className="mt-1 text-xs text-[#8B716A] md:text-sm">Monthly revenue across your bookings.</p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-xs text-[#8B716A]">
          <span className="size-2.5 rounded-full bg-[#A3391C]" />
          Revenue
        </div>
      </div>

      <div className="mt-6 h-56 md:h-72">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#8B7E72]">
            No revenue recorded yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#8B716A" }} axisLine={{ stroke: "#DCCFC0" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#8B716A" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#F6ECE0", border: "1px solid #DCCFC0", borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#A3391C" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
