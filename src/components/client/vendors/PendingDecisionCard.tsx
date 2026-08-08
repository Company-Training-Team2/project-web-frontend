export type PendingVendor = {
  id: string;
  name: string;
  category: string;
  price: string;
  responseNote: string;
};

export default function PendingDecisionCard({
  vendor,
}: {
  vendor: PendingVendor;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="relative h-40 bg-[#DCCFC0]">
        <span className="absolute top-3 left-3 text-[10px] font-semibold bg-[#B08D3E] text-white px-2.5 py-1 rounded-full">
          Awaiting Reply
        </span>
      </div>

      <div className="p-4">
        <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">
          {vendor.category}
        </p>
        <div className="flex items-center justify-between mt-1">
          <h3 className="font-serif font-semibold text-[#2B2622]">
            {vendor.name}
          </h3>
          <span className="font-semibold text-sm text-[#A3391C]">
            {vendor.price}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-[#A3391C] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90">
            Message
          </button>
          <button className="flex-1 border border-[#DCCFC0] text-[#2B2622] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2]">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}