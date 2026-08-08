"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const filters = ["All Files"];

export default function DocumentSearchBar() {
  const [active] = useState("All Files");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 md:px-6 pt-4">
      <div className="flex items-center gap-2 flex-1 rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 max-w-md">
        <Search size={16} className="text-[#8B716A]" />
        <input
          placeholder="Search by vendor, file name, or type..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition
              ${
                active === f
                  ? "bg-[#A3391C] text-white"
                  : "bg-[#F6ECE0] border border-[#DCCFC0] text-[#2B2622] hover:bg-[#EDE0D2]"
              }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}