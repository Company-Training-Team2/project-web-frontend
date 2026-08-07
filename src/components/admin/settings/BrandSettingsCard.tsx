"use client";

import { useState } from "react";
import { Palette, UploadCloud } from "lucide-react";

export default function BrandSettingsCard({
  brandColor,
  onChange,
}: {
  brandColor: string;
  onChange: (patch: Partial<{ brandColor: string }>) => void;
}) {
  const [logoFileName, setLogoFileName] = useState<string | null>(null);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
        <Palette size={18} className="text-[#A3391C]" />
        Brand Settings
      </h3>

      <div className="mt-4">
        <label className="text-sm text-[#2B2622]">Platform Logo</label>
        <label
          htmlFor="platform-logo"
          className="mt-1.5 flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#DCCFC0] bg-white text-center"
        >
          <UploadCloud size={20} className="text-[#8B716A]" />
          <span className="text-sm text-[#8B716A]">{logoFileName ?? "SVG or PNG (Max 5MB)"}</span>
          <input
            id="platform-logo"
            type="file"
            accept="image/svg+xml,image/png"
            className="hidden"
            onChange={(e) => setLogoFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
      </div>

      <div className="mt-4">
        <label className="text-sm text-[#2B2622]">Primary Brand Color</label>
        <div className="mt-1.5 flex h-11 items-center gap-3 rounded-xl border border-[#DCCFC0] bg-white px-3">
          <span className="size-6 shrink-0 rounded-md" style={{ backgroundColor: brandColor }} />
          <input
            value={brandColor}
            onChange={(e) => onChange({ brandColor: e.target.value })}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
}
