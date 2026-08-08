const items = [
  { title: "Corporate Events", value: 65 },
  { title: "Private Weddings", value: 25 },
  { title: "Galas & Fundraisers", value: 10 },
];

export default function PerformanceIntelligence() {
  return (
    <div className="rounded-[16px] bg-[#1B2421] text-white p-4 md:p-6 h-full flex flex-col">
      <h2 className="font-semibold text-lg">Performance Intelligence</h2>

      <div className="space-y-5 mt-6">
        {items.map((item) => (
          <div key={item.title}>
            <div className="flex justify-between mb-2 text-sm">
              <span>{item.title}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className="bg-[#D97745] h-1.5 rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white/70 leading-relaxed">
        &quot;Your inquiries for &apos;Luxury Weddings&apos; have increased
        by 40% this month. Consider highlighting your &apos;Gold
        Package&apos; on the storefront.&quot;
      </div>
    </div>
  );
}