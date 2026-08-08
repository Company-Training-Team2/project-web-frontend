import { Wallet, CheckCircle2, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Wallet,
    label: "NET REVENUE",
    value: "$42,850",
    growth: "+12.4%",
    note: "vs previous month",
  },
  {
    icon: CheckCircle2,
    label: "CONFIRMED BOOKINGS",
    value: "18",
    growth: "+2",
    note: "active events this month",
  },
  {
    icon: Users,
    label: "UNIQUE VISITORS",
    value: "1,240",
    growth: "-3.1%",
    note: "profile & portfolio views",
    down: true,
  },
  {
    icon: TrendingUp,
    label: "CONV. RATE",
    value: "4.8%",
    growth: "+0.5%",
    note: "inquiry-to-booking ratio",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] md:text-xs text-[#8B7E72] tracking-wide font-medium">
              {stat.label}
            </p>
            <stat.icon size={15} className="text-[#A3391C]" />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-lg md:text-2xl font-bold text-[#2B2622]">
              {stat.value}
            </h2>
            <span
              className={`text-xs font-medium ${
                stat.down ? "text-red-600" : "text-green-700"
              }`}
            >
              {stat.growth}
            </span>
          </div>

          <p className="text-[10px] md:text-xs text-[#8B716A] mt-1">
            {stat.note}
          </p>
        </div>
      ))}
    </div>
  );
}