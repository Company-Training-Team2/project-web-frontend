import { Users, Store, CalendarCheck, Wallet } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Total Users",
    value: "42.8k",
    growth: "+8%",
  },
  {
    icon: Store,
    label: "Active Vendors",
    value: "2.4k",
    growth: "+4%",
  },
  {
    icon: CalendarCheck,
    label: "Bookings Today",
    value: "156",
    growth: "+12%",
  },
  {
    icon: Wallet,
    label: "Revenue Today",
    value: "EGP 485,200",
    growth: "+6%",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#EDE0D2] flex items-center justify-center text-[#A3391C]">
              <stat.icon size={18} />
            </div>
            <span className="text-green-700 text-xs font-medium">
              {stat.growth}
            </span>
          </div>

          <p className="text-xs md:text-sm text-[#8B716A] mt-3">
            {stat.label}
          </p>
          <h2 className="text-lg md:text-2xl font-bold mt-1 truncate text-[#2B2622]">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}