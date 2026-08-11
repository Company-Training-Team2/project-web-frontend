"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AdminMonthlyRevenueDto } from "@/services/admin.service";

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Real data — GET /api/admin/reports/analytics's MonthlyRevenue. Only one
// real period exists (no prior-year series to compare against), so this
// plots gross revenue against the platform's own commission share of it
// rather than inventing a "last year" line.
export default function MonthlyRevenueChart({
  data,
  height = "100%",
}: {
  data: AdminMonthlyRevenueDto[];
  height?: number | string;
}) {
  const chartData = [...data]
    .sort((a, b) => a.year - b.year || a.month - b.month)
    .map((m) => ({
      month: MONTH_LABELS[m.month - 1] ?? String(m.month),
      "Gross Revenue": m.grossRevenue,
      Commission: m.commission,
    }));

  if (chartData.length === 0) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-sm text-[#8B7E72]">
        No revenue recorded yet.
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8B716A" }} axisLine={{ stroke: "#DCCFC0" }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#8B716A" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#F6ECE0", border: "1px solid #DCCFC0", borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Gross Revenue" stroke="#A3391C" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="Commission" stroke="#8B716A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
