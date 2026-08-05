"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";

export default function PaymentMethodsHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b border-[#e5ded2] px-5 py-4 lg:px-10">
      <button onClick={() => router.back()} aria-label="Back" className="text-[#252323]">
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="font-serif text-[20px] font-bold text-[#252323]">Payment &amp; Methods</h1>
      <button aria-label="Search" className="text-[#252323]">
        <Search className="size-5" />
      </button>
    </div>
  );
}
