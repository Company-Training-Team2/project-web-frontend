"use client";

import { useState } from "react";

const filters = ["All (12)", "Catering", "Floral", "Venues"];

export default function CategoryFilters() {
  const [active, setActive] = useState("All (12)");

  return (
    <div className="flex items-center gap-2 px-4 md:px-6 pt-4 overflow-x-auto no-scrollbar">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition
            ${
              active === f
                ? "bg-[#CFE3D6] text-[#1F7A4D]"
                : "bg-[#F6ECE0] border border-[#DCCFC0] text-[#2B2622] hover:bg-[#EDE0D2]"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}