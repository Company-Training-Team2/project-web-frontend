"use client";

import { useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

export interface GalleryImage {
  key: string;
  url: string;
  isPrimary?: boolean;
  isStaged?: boolean; // local File not yet uploaded (create mode only)
}

export default function MediaGalleryCard({
  images,
  onAddFiles,
  onRemoveStaged,
  uploading,
}: {
  images: GalleryImage[];
  onAddFiles: (files: FileList) => void;
  onRemoveStaged?: (key: string) => void;
  uploading?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  const rest = images.filter((i) => i !== primary);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">Media Gallery</h2>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1 text-xs font-medium text-[#A3391C] disabled:opacity-60"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
          Upload Images
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) onAddFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div className="h-56 rounded-xl bg-[#DCCFC0] mb-3 overflow-hidden">
        {primary && (
          // eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded/staged images are arbitrary URLs
          <img src={primary.url} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {rest.map((img) => (
          <div key={img.key} className="relative h-16 rounded-lg bg-[#DCCFC0] overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded/staged images are arbitrary URLs */}
            <img src={img.url} alt="" className="h-full w-full object-cover" />
            {img.isStaged && onRemoveStaged && (
              <button
                type="button"
                onClick={() => onRemoveStaged(img.key)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-16 rounded-lg border-2 border-dashed border-[#8B716A]/40 flex items-center justify-center text-[#8B716A] text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
