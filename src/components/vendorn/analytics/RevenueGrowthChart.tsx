"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { month: "JAN", current: 12000, previous: 9000 },
  { month: "FEB", current: 14000, previous: 10500 },
  { month: "MAR", current: 13500, previous: 11000 },
  { month: "APR", current: 18000, previous: 12000 },
  { month: "MAY", current: 22000, previous: 13500 },
  { month: "JUN", current: 26000, previous: 14000 },
  { month: "JUL", current: 24000, previous: 15500 },
  { month: "AUG", current: 30000, previous: 16000 },
  { month: "SEP", current: 27000, previous: 17000 },
  { month: "OCT", current: 34000, previous: 18500 },
  { month: "NOV", current: 38000, previous: 19000 },
  { month: "DEC", current: 42850, previous: 21000 },
];

export default function RevenueGrowthChart() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-semibold text-[#2B2622]">
            Revenue &amp; Growth Projection
          </h2>
          <p className="text-xs md:text-sm text-[#8B716A] mt-1">
            Annual performance overview of seasonal event trends.
          </p>
        </div>

        <div className="flex gap-4 text-xs text-[#8B716A] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3391C]" />
            Current Year
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCCFC0]" />
            Previous Year
          </div>
        </div>
      </div>

      <div className="mt-6 h-56 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#8B716A" }}
              axisLine={{ stroke: "#DCCFC0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#8B716A" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#F6ECE0",
                border: "1px solid #DCCFC0",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#DCCFC0"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#A3391C"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}