const vendors = [
  { name: "Pharaoh's Feast Catering", category: "Catering & Events", revenue: "EGP 248,900", growth: "+18.4%" },
  { name: "Nourhan Farid Design", category: "Corporate Photography", revenue: "EGP 176,150", growth: "+12.9%" },
  { name: "Cascade Photography", category: "Portrait & Cinematic", revenue: "EGP 137,320", growth: "+9.6%" },
];

const categories = [
  { label: "Wedding & Events", value: 42, color: "#A3391C" },
  { label: "Corporate Galas", value: 27, color: "#3F5B4E" },
  { label: "Private Portraits", value: 18, color: "#C9A24B" },
  { label: "Live Entertainment", value: 9, color: "#8B716A" },
  { label: "Other", value: 4, color: "#DCCFC0" },
];

export default function VendorsAndCategory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 min-w-0">
        <h2 className="font-semibold text-xl text-[#2B2622] mb-4">
          Top Performing Vendors
        </h2>

        <div className="space-y-4">
          {vendors.map((v) => (
            <div key={v.name} className="flex items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#DCCFC0] shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#2B2622] truncate">{v.name}</p>
                  <p className="text-xs text-[#8B7E72] truncate">{v.category}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-[#2B2622]">{v.revenue}</p>
                <p className="text-xs text-green-600">{v.growth}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-5 text-sm font-medium text-[#A3391C] hover:underline">
          View Full Vendor Ledger →
        </button>
      </div>

      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 min-w-0">
        <h2 className="font-semibold text-xl text-[#2B2622] mb-5">
          Category Market Share
        </h2>

        <div className="space-y-4">
          {categories.map((c) => (
            <div key={c.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#2B2622]">{c.label}</span>
                <span className="text-[#8B716A]">{c.value}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EDE0D2]">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${c.value}%`, backgroundColor: c.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}