import { Star } from "lucide-react";

export type BookedVendor = {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: string;
};

export default function BookedVendorCard({ vendor }: { vendor: BookedVendor }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="relative h-40 bg-[#DCCFC0]">
        <span className="absolute top-3 left-3 text-[10px] font-semibold bg-[#1F7A4D] text-white px-2.5 py-1 rounded-full">
          Booked
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold bg-white/90 text-[#2B2622] px-2 py-1 rounded-full">
          <Star size={11} className="fill-[#B08D3E] text-[#B08D3E]" />
          {vendor.rating}
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
            Contact
          </button>
          <button className="flex-1 border border-[#DCCFC0] text-[#2B2622] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2]">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}