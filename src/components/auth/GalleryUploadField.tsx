"use client";

import { useMemo } from "react";
import { UploadCloud, X } from "lucide-react";
import FormField from "./FormField";

// REG-VEN-034/035: was a single-file UploadField mislabeled "up to 10" —
// selecting a second image replaced the first instead of adding to a
// gallery, and there was no real limit enforcement because there was no
// real multi-image concept here at all. This is a genuine multi-select
// field: `multiple` on the native input, files are appended (not replaced)
// up to `max`, and each can be removed individually via its own thumbnail.
export default function GalleryUploadField({
  id,
  label,
  hint,
  files,
  onFilesChange,
  max = 10,
}: {
  id: string;
  label: string;
  hint: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  max?: number;
}) {
  // Object URLs are cheap to recreate per render for a handful of thumbnails
  // and get garbage-collected with the page — no explicit revoke needed for
  // a form this short-lived, unlike a long-running gallery editor.
  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  const atLimit = files.length >= max;

  const handlePick = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    const room = max - files.length;
    const toAdd = Array.from(picked).slice(0, Math.max(room, 0));
    onFilesChange([...files, ...toAdd]);
  };

  const handleRemove = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <FormField id={id} label={`${label} (${files.length}/${max})`}>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {files.map((file, i) => (
          <div key={`${file.name}-${i}`} className="relative aspect-square overflow-hidden rounded-[10px] border border-[#ded8d2]">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL, not a remote src */}
            <img src={previews[i]} alt="" className="size-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              aria-label="Remove image"
              className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        {!atLimit ? (
          <label
            htmlFor={id}
            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border border-dashed border-[#ded8d2] bg-white px-2 text-center transition hover:border-[#af3718]"
          >
            <UploadCloud className="size-4 text-[#b7aaa0]" />
            <span className="text-[10px] leading-tight text-[#6d5d54]">{hint}</span>
            <input
              id={id}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                handlePick(event.target.files);
                event.target.value = "";
              }}
            />
          </label>
        ) : null}
      </div>
    </FormField>
  );
}
