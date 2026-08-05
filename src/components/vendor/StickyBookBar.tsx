"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function StickyBookBar({
  vendorId,
  packageId,
  pricePerGuest,
}: {
  vendorId: string;
  packageId: string | null;
  pricePerGuest: number;
}) {
  const router = useRouter();

  return (
    <div className="sticky bottom-0 z-20 flex items-center justify-between border-t border-[#e5ded2] bg-white/95 px-5 py-4 backdrop-blur lg:px-10">
      <div>
        <p className="text-[11px] uppercase tracking-[0.06em] text-[#a79a90]">Starting from</p>
        <p className="text-[18px] font-bold text-[#252323]">{pricePerGuest}/guest</p>
      </div>
      <Button
        onClick={() =>
          router.push(`/booking/reserve?vendorId=${vendorId}${packageId ? `&packageId=${packageId}` : ""}`)
        }
        className="h-12 rounded-[10px] bg-[#af3718] px-8 hover:bg-[#9f3216]"
      >
        Book Now
      </Button>
    </div>
  );
}
