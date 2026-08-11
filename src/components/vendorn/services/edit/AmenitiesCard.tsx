"use client";

import { useState } from "react";

// Not part of CreateWorkPostDto/UpdateWorkPostDto yet — kept as local-only
// UI state, not sent to the backend on submit.
const amenities = [
  "Valet Parking",
  "Private Bridal Suite",
  "Rooftop Terrace",
  "Bespoke Floral Wall",
  "Live Event Security",
  "Sound & Lighting Rig",
];

export default function AmenitiesCard() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-1">Luxury Amenities</h2>
      <p className="text-[11px] text-[#8B7E72] mb-4">
        Not yet saved with your service — the backend doesn&apos;t support
        amenities yet.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {amenities.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-sm text-[#2B2622] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => toggle(item)}
              className="accent-[#A3391C] w-4 h-4"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
