const funnel = [
  { label: "Discovery Impressions", value: "312.4K", percent: 100, color: "#EDE0D2", text: "#2B2622" },
  { label: "App Download / Signup", value: "58.2K", percent: 68, color: "#3F5B4E", text: "#FFFFFF" },
  { label: "Booking Confirmed", value: "12,940", percent: 34, color: "#A3391C", text: "#FFFFFF" },
];

const origins = [
  { label: "Organic Search", value: "42%", color: "#A3391C" },
  { label: "Social Referral", value: "28%", color: "#3F5B4E" },
  { label: "Direct / App", value: "18%", color: "#C9A24B" },
  { label: "Partner Sites", value: "12%", color: "#8B716A" },
];

export default function FunnelAndTraffic() {
  const gradient =
    "conic-gradient(#A3391C 0% 42%, #3F5B4E 42% 70%, #C9A24B 70% 88%, #8B716A 88% 100%)";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 min-w-0">
        <h2 className="font-semibold text-xl text-[#2B2622] mb-5">
          Acquisition Funnel
        </h2>

        <div className="space-y-3">
          {funnel.map((f) => (
            <div
              key={f.label}
              className="rounded-xl px-4 py-3 flex items-center justify-between max-w-full"
              style={{ backgroundColor: f.color, width: `${f.percent}%`, color: f.text }}
            >
              <span className="text-sm font-medium truncate">
                {f.label} ({f.value})
              </span>
              <span className="text-sm font-semibold shrink-0 ml-2">{f.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 min-w-0 flex flex-col items-center">
        <h2 className="font-semibold text-xl text-[#2B2622] mb-5 self-start">
          Traffic Origins
        </h2>

        <div
          className="w-36 h-36 rounded-full flex items-center justify-center"
          style={{ background: gradient }}
        >
          <div className="w-24 h-24 rounded-full bg-[#F6ECE0] flex flex-col items-center justify-center">
            <span className="text-xs text-[#8B7E72]">Total Visits</span>
            <span className="text-lg font-bold text-[#2B2622]">312.4K</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6 w-full">
          {origins.map((o) => (
            <div key={o.label} className="flex items-center gap-2 text-sm min-w-0">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: o.color }} />
              <span className="text-[#2B2622] truncate">{o.label}</span>
              <span className="text-[#8B716A] ml-auto shrink-0">{o.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}