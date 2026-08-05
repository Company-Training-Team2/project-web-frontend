"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { getCategoryById } from "@/lib/mock/categories";
import { MockVendor } from "@/lib/mock/types";

export default function VendorHeroCarousel({ vendor }: { vendor: MockVendor }) {
  const router = useRouter();
  const category = getCategoryById(vendor.categoryId);

  return (
    <div className="relative h-[260px] w-full bg-[#e9dfd1] lg:h-[360px] lg:rounded-b-[20px]">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="grid size-9 place-items-center rounded-full bg-white/90 text-[#252323]"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex gap-2">
          <button aria-label="Share" className="grid size-9 place-items-center rounded-full bg-white/90 text-[#252323]">
            <Share2 className="size-4" />
          </button>
          <button aria-label="Save" className="grid size-9 place-items-center rounded-full bg-white/90 text-[#252323]">
            <Heart className="size-4" />
          </button>
        </div>
      </div>

      <span className="absolute bottom-5 left-5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
        {category?.name ?? "Vendor"}
      </span>

      <div className="absolute bottom-4 right-5 flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`size-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}
