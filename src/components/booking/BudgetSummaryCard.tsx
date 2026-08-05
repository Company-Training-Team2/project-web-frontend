export default function BudgetSummaryCard({
  packageName,
  guestCount,
  pricePerGuest,
  concierge = 1890,
}: {
  packageName: string;
  guestCount: number;
  pricePerGuest: number;
  concierge?: number;
}) {
  const subtotal = guestCount * pricePerGuest;
  const total = subtotal + concierge;

  return (
    <div className="mx-5 mt-6 rounded-[16px] bg-[#102b1f] p-5 text-white lg:mx-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/60">Budget Summary</p>

      <div className="mt-3 space-y-2 text-[14px]">
        <div className="flex justify-between">
          <span className="text-white/80">
            {packageName} × {guestCount}
          </span>
          <span>{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/80">Concierge &amp; service</span>
          <span>{concierge.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-3 border-t border-white/15 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-white/60">Estimated total</span>
          <span className="font-serif text-[26px] font-bold text-[#d4a24c]">
            {total.toLocaleString()}
            <span className="ml-1 text-[13px]">EGP</span>
          </span>
        </div>
      </div>
    </div>
  );
}
