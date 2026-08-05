export default function OrderSummaryBlock({
  packageName,
  guestCount,
  pricePerGuest,
  concierge = 1890,
  deposit = 500,
}: {
  packageName: string;
  guestCount: number;
  pricePerGuest: number;
  concierge?: number;
  deposit?: number;
}) {
  const subtotal = guestCount * pricePerGuest;
  const total = subtotal + concierge + deposit;

  return (
    <div className="mx-5 mt-6 rounded-[16px] border border-[#e5ded2] bg-white p-4 lg:mx-10">
      <div className="space-y-2 text-[14px] text-[#6d5d54]">
        <div className="flex justify-between">
          <span>
            {packageName} × {guestCount}
          </span>
          <span>{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Concierge &amp; service</span>
          <span>{concierge.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Refundable deposit</span>
          <span>{deposit.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between border-t border-[#e5ded2] pt-3">
        <div>
          <p className="text-[14px] font-bold text-[#252323]">Total due today</p>
          <p className="text-[11px] text-[#a79a90]">Balance billed 14 days prior</p>
        </div>
        <p className="font-serif text-[24px] font-bold text-[#252323]">{total.toLocaleString()}</p>
      </div>
    </div>
  );
}
