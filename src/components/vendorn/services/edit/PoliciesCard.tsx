export default function PoliciesCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Policies</h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[#2B2622]">
            Cancellation — 50% refund if cancelled 30+ days before event.
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#2B2622]">
            50% deposit required at booking.
          </span>
        </div>
      </div>
    </div>
  );
}