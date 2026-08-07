import { UploadCloud } from "lucide-react";

export default function MediaGalleryCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">Media Gallery</h2>
        <button className="flex items-center gap-1 text-xs font-medium text-[#A3391C]">
          <UploadCloud size={14} />
          Upload Images
        </button>
      </div>

      <div className="h-56 rounded-xl bg-[#DCCFC0] mb-3" />

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 rounded-lg bg-[#DCCFC0]" />
        ))}
        <button className="h-16 rounded-lg border-2 border-dashed border-[#8B716A]/40 flex items-center justify-center text-[#8B716A] text-xl">
          +
        </button>
      </div>
    </div>
  );
}