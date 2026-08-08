const clients = [
  {
    name: "Julianne Vance",
    subtitle: "3 Events booked",
    amount: "$18,200",
    tag: "VIP",
    tagColor: "text-[#A3391C]",
  },
  {
    name: "Vanguard Global",
    subtitle: "Corporate Retainer",
    amount: "$12,000",
    tag: "CORPORATE",
    tagColor: "text-[#8B716A]",
  },
  {
    name: "The Sterlings",
    subtitle: "Wedding Client",
    amount: "$9,500",
    tag: "REVENUE",
    tagColor: "text-[#8B716A]",
  },
  {
    name: "Elena Rodriguez",
    subtitle: "New Inquiry (High Interest)",
    amount: "TBD",
    tag: "PROSPECT",
    tagColor: "text-[#8B716A]",
  },
];

export default function PremiumClientele() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">Premium Clientele</h2>
        <button className="text-xs md:text-sm text-[#A3391C] font-medium">
          View CRM
        </button>
      </div>

      <div className="space-y-4">
        {clients.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DCCFC0] shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2B2622] truncate">
                {c.name}
              </p>
              <p className="text-xs text-[#8B716A] truncate">{c.subtitle}</p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-[#A3391C]">
                {c.amount}
              </p>
              <p className={`text-[10px] font-medium ${c.tagColor}`}>
                {c.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}