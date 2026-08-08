"use client";

import { useState } from "react";

const tabs = ["All Vendors", "Booked (4)", "Pending (2)"];

export default function VendorsTabs() {
  const [active, setActive] = useState("All Vendors");

  return (
    <div className="px-4 md:px-6 pt-4">
      <p className="text-[10px] font-semibold text-[#8B7E72] uppercase tracking-wide">
        Smith-Wilson Wedding
      </p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622] mt-1">
        Event Vendors
      </h1>

      <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition
              ${
                active === t
                  ? "bg-[#A3391C] text-white"
                  : "bg-[#F6ECE0] border border-[#DCCFC0] text-[#2B2622] hover:bg-[#EDE0D2]"
              }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}