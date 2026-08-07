export default function PricingLogisticsCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">
        Pricing &amp; Logistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Base Price (£)
          </label>
          <input
            defaultValue="32900"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Guest Packaging
          </label>
          <div className="flex items-center justify-between rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622]">
            <span>Silver Package</span>
            <span className="text-[#8B716A]">£300 / guest</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Min Guests
          </label>
          <input
            defaultValue="50"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Full Package
          </label>
          <div className="flex items-center justify-between rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622]">
            <span>Gold Package</span>
            <span className="text-[#8B716A]">£450 / guest</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Max Guests
          </label>
          <input
            defaultValue="350"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>
    </div>
  );
}