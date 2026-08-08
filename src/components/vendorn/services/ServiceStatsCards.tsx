const stats = [
  { label: "TOTAL SERVICES", value: "12", color: "text-[#2B2622]" },
  { label: "ACTIVE", value: "8", color: "text-[#A3391C]" },
  { label: "DRAFTS", value: "4", color: "text-[#B08D3E]" },
  { label: "TOTAL BOOKINGS", value: "142", color: "text-[#2B2622]" },
  { label: "MONTHLY REVENUE", value: "EGP 85k", color: "text-[#1F7A4D]" },
];

export default function ServiceStatsCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4"
        >
          <p className="text-[10px] text-[#8B7E72] tracking-wide font-medium">
            {s.label}
          </p>
          <p className={`text-xl md:text-2xl font-bold mt-2 ${s.color}`}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}