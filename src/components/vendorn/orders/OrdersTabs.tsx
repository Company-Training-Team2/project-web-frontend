"use client";

import { useState } from "react";

const tabs = ["Pending", "Approved", "Rejected"];

export default function OrdersTabs() {
  const [active, setActive] = useState("Pending");

  return (
    <div className="flex items-center gap-2 px-4 md:px-6 pt-4">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`text-sm font-medium px-5 py-2 rounded-full whitespace-nowrap transition
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
  );
}