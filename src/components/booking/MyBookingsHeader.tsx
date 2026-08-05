"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical } from "lucide-react";

export default function MyBookingsHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-5 pt-6 lg:px-10">
      <button
        onClick={() => router.back()}
        aria-label="Back"
        className="grid size-9 place-items-center rounded-full bg-white text-[#252323] shadow-sm"
      >
        <ArrowLeft className="size-4" />
      </button>
      <h1 className="font-serif text-[22px] font-bold text-[#252323]">My Bookings</h1>
      <button aria-label="More options" className="grid size-9 place-items-center rounded-full text-[#252323]">
        <MoreVertical className="size-5" />
      </button>
    </div>
  );
}
