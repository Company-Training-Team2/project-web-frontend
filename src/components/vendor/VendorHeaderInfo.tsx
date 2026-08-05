import { Star } from "lucide-react";
import { MockVendor } from "@/lib/mock/types";

export default function VendorHeaderInfo({ vendor }: { vendor: MockVendor }) {
  return (
    <div className="px-5 pt-5 lg:px-10">
      <h1 className="font-serif text-[28px] font-bold text-[#252323]">{vendor.businessName}</h1>
      <p className="mt-1 text-[14px] text-[#6d5d54]">
        {vendor.city}
        {vendor.credential ? ` • ${vendor.credential}` : ""}
      </p>

      <div className="mt-4 grid grid-cols-3 divide-x divide-[#e5ded2] rounded-[12px] border border-[#e5ded2] bg-white py-3 text-center">
        <div>
          <p className="flex items-center justify-center gap-1 text-[16px] font-bold text-[#252323]">
            <Star className="size-4 fill-[#c59c42] text-[#c59c42]" />
            {vendor.rating.toFixed(1)}
          </p>
          <p className="text-[11px] text-[#a79a90]">{vendor.reviewCount} REVIEWS</p>
        </div>
        <div>
          <p className="text-[16px] font-bold text-[#252323]">{vendor.eventsCount}</p>
          <p className="text-[11px] text-[#a79a90]">EVENTS</p>
        </div>
        <div>
          <p className="text-[16px] font-bold text-[#252323]">{vendor.yearsExperience}</p>
          <p className="text-[11px] text-[#a79a90]">YRS EXPERIENCE</p>
        </div>
      </div>
    </div>
  );
}
