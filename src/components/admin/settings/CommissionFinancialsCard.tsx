import { CreditCard } from "lucide-react";

export default function CommissionFinancialsCard({
  commissionRate,
  taxRate,
  onChange,
}: {
  commissionRate: number;
  taxRate: number;
  onChange: (patch: Partial<{ commissionRate: number; taxRate: number }>) => void;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
        <CreditCard size={18} className="text-[#A3391C]" />
        Commission &amp; Financials
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-[#2B2622]">Platform Commission Rate (%)</label>
          <div className="mt-1.5 flex h-11 items-center rounded-xl border border-[#DCCFC0] bg-white px-3">
            <input
              type="number"
              step="0.1"
              value={commissionRate}
              onChange={(e) => onChange({ commissionRate: Number(e.target.value) })}
              className="w-full bg-transparent text-sm outline-none"
            />
            <span className="text-sm text-[#8B716A]">%</span>
          </div>
          <p className="mt-1 text-[11px] text-[#8B716A]">Applied to every successful vendor booking.</p>
        </div>
        <div>
          <label className="text-sm text-[#2B2622]">Global Tax Rate (%)</label>
          <div className="mt-1.5 flex h-11 items-center rounded-xl border border-[#DCCFC0] bg-white px-3">
            <input
              type="number"
              step="0.1"
              value={taxRate}
              onChange={(e) => onChange({ taxRate: Number(e.target.value) })}
              className="w-full bg-transparent text-sm outline-none"
            />
            <span className="text-sm text-[#8B716A]">%</span>
          </div>
          <p className="mt-1 text-[11px] text-[#8B716A]">Standard VAT/GST rate for platform services.</p>
        </div>
      </div>
    </div>
  );
}
