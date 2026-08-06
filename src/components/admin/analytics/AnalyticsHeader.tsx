import { CalendarDays, Download } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "EGP 84.2M",
    change: "+7.8%",
    color: "#A3391C",
    points: "0,30 15,26 30,28 45,20 60,22 75,10 90,4",
  },
  {
    label: "Total Bookings",
    value: "1,842",
    change: "+6.9%",
    color: "#3F5B4E",
    points: "0,20 15,22 30,18 45,24 60,20 75,22 90,18",
  },
  {
    label: "Platform Rate",
    value: "24.1%",
    change: "+2.1%",
    color: "#C9A24B",
    points: "0,24 15,24 30,25 45,24 60,25 75,24 90,25",
  },
  {
    label: "Avg. CLTV",
    value: "EGP 839",
    change: "+16.2%",
    color: "#3F5B4E",
    points: "0,28 15,26 30,27 45,26 60,24 75,10 90,6",
  },
];

export default function AnalyticsHeader() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 mt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2B2622]">
            Platform Analytics
          </h1>
          <p className="mt-1 text-sm text-[#8B716A]">
            Executive intelligence dashboard &middot; Q3 fiscal review
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-[#DCCFC0] bg-white/60 px-4 py-2 text-sm text-[#2B2622] hover:bg-[#EDE0D2] transition">
            <CalendarDays size={16} />
            Past 30 Days
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#3F5B4E] px-4 py-2 text-sm text-white hover:bg-[#354e43] transition">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-[16px] border border-[#DCCFC0] p-4 min-w-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-[#8B7E72]">
                {s.label}
              </span>
              <span className="text-xs font-medium text-green-600">
                {s.change}
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-[#2B2622]">
              {s.value}
            </p>

            <svg viewBox="0 0 90 34" className="w-full h-8 mt-3" preserveAspectRatio="none">
              <polyline
                points={s.points}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}