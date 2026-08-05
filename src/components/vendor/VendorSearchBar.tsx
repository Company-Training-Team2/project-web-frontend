"use client";

import { Search } from "lucide-react";

export default function VendorSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="relative px-5 lg:px-10">
      <Search className="pointer-events-none absolute left-8 top-1/2 size-4 -translate-y-1/2 text-[#a79a90] lg:left-13" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Florists, caterers, venues..."
        className="h-12 w-full rounded-[12px] border border-[#e5ded2] bg-white pl-10 pr-4 text-[14px] placeholder:text-[#a79a90] focus:outline-none focus:ring-2 focus:ring-[#af3718]/30"
      />
    </div>
  );
}
