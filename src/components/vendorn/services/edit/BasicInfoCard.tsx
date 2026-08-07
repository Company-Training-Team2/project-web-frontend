export default function BasicInfoCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Service Name
          </label>
          <input
            defaultValue="Signature Heritage Banquet"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Category
          </label>
          <select className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]">
            <option>Venues &amp; Dining</option>
            <option>Floral Design</option>
            <option>Catering</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Description
          </label>
          <textarea
            rows={4}
            defaultValue="Experience the grand heritage of Maison Events with our signature Heritage Banquet — a full culinary journey blended with elegant floor programming and unmatched hospitality to ensure your most distinguished guests remember every detail of an unforgettable evening."
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C] resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Location
          </label>
          <input
            defaultValue="Grosvenor Manor, District 12"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>
    </div>
  );
}