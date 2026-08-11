"use client";

import { Palette } from "lucide-react";

// PlatformLogoUrl is a real, persisted field (AdminSettingsDto) — but the
// backend has no image-upload endpoint for it (only vendor service images
// upload; see vendorPortal.service.ts), so this takes a pasted URL rather
// than a file dropzone. Brand color has no backing field at all — kept as a
// local, clearly-labeled preview so "Save Changes" never implies it persisted.
export default function BrandSettingsCard({
  logoUrl,
  brandColor,
  onChangeLogoUrl,
  onChangeBrandColor,
}: {
  logoUrl: string;
  brandColor: string;
  onChangeLogoUrl: (url: string) => void;
  onChangeBrandColor: (color: string) => void;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
        <Palette size={18} className="text-[#A3391C]" />
        Brand Settings
      </h3>

      <div className="mt-4">
        <label className="text-sm text-[#2B2622]">Platform Logo URL</label>
        <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-[#DCCFC0] bg-white px-3 py-2">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Platform logo" className="size-9 shrink-0 rounded-md object-cover" />
          ) : (
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#EDE0D2] text-[10px] text-[#8B716A]">
              None
            </span>
          )}
          <input
            value={logoUrl}
            onChange={(e) => onChangeLogoUrl(e.target.value)}
            placeholder="https://…/logo.svg"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#a79a90]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-1.5 text-sm text-[#2B2622]">
          Primary Brand Color
          <span className="rounded-full bg-[#DCCFC0] px-1.5 py-0.5 text-[10px] font-semibold text-[#5A4E43]">
            Preview only — not saved
          </span>
        </label>
        <div className="mt-1.5 flex h-11 items-center gap-3 rounded-xl border border-[#DCCFC0] bg-white px-3">
          <span className="size-6 shrink-0 rounded-md" style={{ backgroundColor: brandColor }} />
          <input
            value={brandColor}
            onChange={(e) => onChangeBrandColor(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>
    </div>
  );
}
