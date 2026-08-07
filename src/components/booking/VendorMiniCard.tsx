import { Mail, Star } from "lucide-react";
import { getCategoryById } from "@/lib/mock/categories";
import { MockVendor } from "@/lib/mock/types";

export default function VendorMiniCard({ vendor }: { vendor: MockVendor }) {
  const category = getCategoryById(vendor.categoryId);

  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-4">
      <div className="relative h-28 w-full overflow-hidden rounded-[10px] bg-[#e9dfd1]">
        {vendor.images[0] ? (
          <img src={vendor.images[0]} alt={vendor.businessName} className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-[#252323]">
          <Star className="size-3 fill-[#c59c42] text-[#c59c42]" />
          {vendor.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#af3718]">
        {category?.name ?? "Vendor"}
      </p>
      <p className="font-serif text-[16px] font-bold text-[#252323]">{vendor.businessName}</p>

      <div className="mt-3 flex items-center gap-2 border-t border-[#e5ded2] pt-3">
        <span className="grid size-8 place-items-center rounded-full bg-[#e9dfd1] text-[11px] font-bold text-[#252323]">
          A
        </span>
        <div>
          <p className="text-[12px] font-bold text-[#252323]">Account Manager</p>
        </div>
      </div>

      {/* Mock — no real messaging endpoint yet. */}
      <button className="mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-[8px] border border-[#e5ded2] text-[13px] font-medium text-[#252323] hover:bg-[#faf6f0]">
        <Mail className="size-3.5" />
        Contact Vendor
      </button>
    </div>
  );
}
