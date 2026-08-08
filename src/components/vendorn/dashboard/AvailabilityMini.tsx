"use client";

import { useState } from "react";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const days = [
  ...Array(1).fill(null),
  ...Array.from({ length: 30 }, (_, i) => i + 1),
];

export default function AvailabilityMini() {
  const [selected, setSelected] = useState(15);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm text-[#2B2622]">Availability</h2>
        <span className="text-xs text-[#8B716A]">June 2024</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#8B7E72] font-medium mb-1">
        {weekdays.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <button
            key={i}
            disabled={d === null}
            onClick={() => d && setSelected(d)}
            className={`h-8 rounded-md text-xs flex items-center justify-center
              ${d === null ? "invisible" : ""}
              ${
                d === selected
                  ? "bg-[#A3391C] text-white font-medium"
                  : "text-[#2B2622] hover:bg-[#EDE0D2]"
              }`}
          >
            {d}
          </button>
        ))}
      </div>

      <button className="w-full mt-4 text-xs font-medium text-[#A3391C] border border-[#DCCFC0] rounded-lg py-2 hover:bg-[#EDE0D2]">
        Manage Full Calendar
      </button>
    </div>
  );
}