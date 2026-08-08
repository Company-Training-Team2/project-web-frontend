const packages = [
  {
    icon: "💎",
    name: "The Diamond Gala Suite",
    subtitle: "Full service planning",
    bookings: 12,
    revenue: "$24,000",
    rating: "4.9",
  },
  {
    icon: "🌿",
    name: "Intimate Garden Soiree",
    subtitle: "Micro-wedding specialist",
    bookings: 4,
    revenue: "$12,400",
    rating: "5.0",
  },
  {
    icon: "🏢",
    name: "Corporate Launchpad",
    subtitle: "Tech & Brand activations",
    bookings: 2,
    revenue: "$6,450",
    rating: "4.7",
  },
];

export default function HighPerformingPackages() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">
          High-Performing Packages
        </h2>
        <button className="text-xs md:text-sm text-[#A3391C] font-medium whitespace-nowrap">
          View All Services
        </button>
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {packages.map((p) => (
          <div key={p.name} className="border border-[#DCCFC0] rounded-xl p-3 flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-base shrink-0">
              {p.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2B2622]">{p.name}</p>
              <p className="text-xs text-[#8B716A]">{p.subtitle}</p>
              <div className="flex items-center gap-3 text-xs text-[#8B7E72] mt-1">
                <span>{p.bookings} bookings</span>
                <span>{p.revenue}</span>
                <span>★ {p.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[420px]">
          <thead className="text-left text-[#8B7E72] text-xs uppercase tracking-wide">
            <tr>
              <th className="pb-3">Service Name</th>
              <th className="pb-3">Bookings</th>
              <th className="pb-3">Revenue</th>
              <th className="pb-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.name} className="border-t border-[#DCCFC0]">
                <td className="py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-base">
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-medium text-[#2B2622] text-sm">
                      {p.name}
                    </p>
                    <p className="text-xs text-[#8B716A]">{p.subtitle}</p>
                  </div>
                </td>
                <td className="text-[#2B2622] text-sm">{p.bookings}</td>
                <td className="text-[#2B2622] text-sm">{p.revenue}</td>
                <td className="text-[#2B2622] text-sm">★ {p.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}