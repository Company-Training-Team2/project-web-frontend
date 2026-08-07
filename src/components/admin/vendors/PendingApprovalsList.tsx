import { Clock } from "lucide-react";
import { AdminPendingVendor } from "@/lib/mock/adminVendors";

export default function PendingApprovalsList({
  vendors,
  selectedId,
  onSelect,
}: {
  vendors: AdminPendingVendor[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-full lg:w-[280px] shrink-0 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
      <h2 className="font-serif text-lg font-bold text-[#2B2622]">Pending Approvals</h2>
      <p className="text-[13px] text-[#8B716A]">{vendors.length} vendors awaiting review</p>

      <div className="mt-3 space-y-1.5">
        {vendors.map((vendor) => {
          const isSelected = vendor.id === selectedId;
          return (
            <button
              key={vendor.id}
              onClick={() => onSelect(vendor.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                isSelected ? "border border-[#A3391C]/40 bg-white" : "hover:bg-white/60"
              }`}
            >
              <span className="size-10 shrink-0 rounded-lg bg-[#DCCFC0]" />
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-sm font-bold ${isSelected ? "text-[#2B2622]" : "text-[#2B2622]/80"}`}>
                  {vendor.businessName}
                </span>
                <span className="block truncate text-[12px] text-[#8B716A]">{vendor.category}</span>
              </span>
              {isSelected ? <Clock size={15} className="shrink-0 text-[#A3391C]" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
