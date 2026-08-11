export type BookingsTab = "Pending" | "Confirmed" | "Cancelled" | "Completed";

const TABS: { key: BookingsTab; label: string }[] = [
  { key: "Pending", label: "Pending Requests" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Cancelled", label: "Cancelled" },
  { key: "Completed", label: "Completed" },
];

export default function BookingsTabs({
  active,
  onChange,
  pendingCount,
}: {
  active: BookingsTab;
  onChange: (tab: BookingsTab) => void;
  pendingCount: number;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pt-5 md:px-8">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition ${
            active === tab.key
              ? "border-[#A3391C] bg-white text-[#A3391C]"
              : "border-[#DCCFC0] bg-transparent text-[#2B2622] hover:bg-white/60"
          }`}
        >
          {tab.label}
          {tab.key === "Pending" ? ` (${pendingCount})` : ""}
        </button>
      ))}
    </div>
  );
}
