import Link from "next/link";
import { Heart, Share2, Star } from "lucide-react";

import { getCategoryById } from "@/lib/mock/categories";
import { MockVendor } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

interface VendorCardProps {
  vendor: MockVendor;
  /** "list" = Browse Vendors mobile vertical list. "grid" = Search Results
   * Desktop 2-column grid. One component, two Tailwind arrangements. */
  layout?: "list" | "grid";
  className?: string;
}

export default function VendorCard({ vendor, layout = "list", className }: VendorCardProps) {
  const category = getCategoryById(vendor.categoryId);
  const priceSuffix = vendor.pricingUnit === "guest" ? "EGP/guest" : "EGP";

  if (layout === "grid") {
    return (
      <div className={cn("overflow-hidden rounded-[16px] border border-[#e5ded2] bg-white", className)}>
        <div className="relative aspect-[16/10] w-full bg-[#e9dfd1]">
          {vendor.images[0] ? (
            <img
              src={vendor.images[0]}
              alt={vendor.businessName}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <button
            aria-label="Save"
            className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-[#252323]"
          >
            <Heart className="size-4" />
          </button>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[12px] font-bold text-[#252323]">
            <Star className="size-3 fill-[#c59c42] text-[#c59c42]" />
            {vendor.rating.toFixed(1)}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-[20px] font-bold leading-tight text-[#252323]">
              {vendor.businessName}
            </h3>
            <p className="shrink-0 text-right text-[13px] font-bold text-[#af3718]">
              From {vendor.price.toLocaleString()} EGP
            </p>
          </div>
          <p className="mt-1 text-[13px] text-[#6d5d54]">
            {category?.name ?? "Vendor"} • {vendor.city}
          </p>
          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.4] text-[#6d5d54]">{vendor.description}</p>

          <div className="mt-4 flex items-center gap-2">
            <Link
              href={`/vendors/${vendor.id}`}
              className="h-10 flex-1 rounded-[8px] bg-[#af3718] text-center text-[13px] font-bold leading-10 text-white transition hover:bg-[#9f3216]"
            >
              View Details
            </Link>
            <button
              aria-label="Share"
              className="grid size-10 shrink-0 place-items-center rounded-[8px] border border-[#e5ded2] text-[#6d5d54]"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className={cn(
        "flex items-center gap-3 rounded-[16px] bg-white p-3 shadow-[0_2px_10px_rgba(47,35,24,0.06)]",
        className
      )}
    >
      <div className="size-20 shrink-0 overflow-hidden rounded-[12px] bg-[#e9dfd1]">
        {vendor.images[0] ? (
          <img src={vendor.images[0]} alt={vendor.businessName} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#af3718]">
            {category?.name ?? "Vendor"}
          </p>
          <span className="flex items-center gap-1 text-[13px] font-bold text-[#252323]">
            <Star className="size-3.5 fill-[#c59c42] text-[#c59c42]" />
            {vendor.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-0.5 truncate font-serif text-[18px] font-bold text-[#252323]">
          {vendor.businessName}
        </h3>
        <p className="truncate text-[12px] text-[#6d5d54]">{vendor.city}</p>
        <p className="mt-1 text-[13px] text-[#252323]">
          from <span className="font-bold">{vendor.price.toLocaleString()}</span> {priceSuffix}
        </p>
      </div>
    </Link>
  );
}
