import { TrendingUp } from "lucide-react";

const cards = [
  {
    title: "Total Revenue",
    value: "EGP 842,500",
    percent: "+8.4%",
    bars: ["25%", "40%", "55%", "70%", "90%"],
  },
  {
    title: "Avg Booking",
    value: "EGP 24,150",
    percent: "-2.8%",
    bars: ["20%", "35%", "45%", "60%", "75%"],
  },
  {
    title: "Active Vendors",
    value: "1,248",
    percent: "+6.4%",
    bars: ["30%", "55%", "75%", "90%", "65%"],
  },
  {
    title: "Refund Rate",
    value: "12.5%",
    percent: "-1.1%",
    bars: [],
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#F6ECE0] border border-[#DCCFC0] rounded-[16px] p-5 min-w-0"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8B716A]">
              {card.title}
            </span>

            <TrendingUp
              size={16}
              className="text-[#A3391C]"
            />
          </div>

          <h2 className="text-3xl font-bold mt-3 text-[#2B2622]">
            {card.value}
          </h2>

          <p className="text-green-600 text-sm mt-1">
            {card.percent}
          </p>

          {card.bars.length > 0 && (
            <div className="flex gap-1 mt-5 h-12 items-end">
              {card.bars.map((height) => (
                <div
                  key={height}
                  className="flex-1 rounded bg-[#A3391C]"
                  style={{ height }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}