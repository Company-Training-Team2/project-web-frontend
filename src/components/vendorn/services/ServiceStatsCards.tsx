import { VendorWorkPost } from "@/services/vendorPortal.service";

export default function ServiceStatsCards({ services }: { services: VendorWorkPost[] }) {
  const active = services.filter((s) => s.approvalStatus === "Approved").length;
  const pending = services.filter((s) => s.approvalStatus === "Pending").length;
  const totalBookings = services.reduce((sum, s) => sum + s.totalBookings, 0);

  const stats = [
    { label: "TOTAL SERVICES", value: String(services.length), color: "text-[#2B2622]" },
    { label: "ACTIVE", value: String(active), color: "text-[#A3391C]" },
    { label: "PENDING REVIEW", value: String(pending), color: "text-[#B08D3E]" },
    { label: "TOTAL BOOKINGS", value: String(totalBookings), color: "text-[#2B2622]" },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
          <p className="text-[10px] font-medium tracking-wide text-[#8B7E72]">{s.label}</p>
          <p className={`mt-2 text-xl font-bold md:text-2xl ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
