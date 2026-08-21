"use client";

import { UploadCloud, FileCheck2 } from "lucide-react";
import FormField from "./FormField";

// Real upload: the selected File is reported to the parent via onFileChange
// so VendorRegisterWizard can attach it to the multipart registration
// request (RegisterRequest.cs's BusinessLogo/CoverImage/CommercialRegistration/
// NationalId/BusinessLicense fields, saved by IFileStorageService).
//
// REG-VEN-018/019/028/029: this used to track the picked filename in its own
// local `useState`, disconnected from the `File` the parent actually holds.
// VendorRegisterWizard keeps step 1/2/3's JSX behind `{step === N ? (...) :
// null}`, so navigating Continue/Previous unmounts the *field*, not the
// wizard — the parent's file state survived fine the whole time, but this
// component remounted with its own fileName reset to null, so the UI showed
// "no file" and looked like the upload was lost even though it wasn't.
// Controlled by `value` now (the actual File, or null) instead of local
// state, so what's displayed always matches what the parent actually has —
// survives remounts because it's no longer this component's own state to lose.
export default function UploadField({
  id,
  label,
  hint,
  accept,
  value,
  onFileChange,
}: {
  id: string;
  label: string;
  hint: string;
  accept: string;
  value?: File | null;
  onFileChange?: (file: File | null) => void;
}) {
  return (
    <FormField id={id} label={label}>
      <label
        htmlFor={id}
        className="flex h-[92px] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[10px] border border-dashed border-[#ded8d2] bg-white px-[14px] text-center transition hover:border-[#af3718]"
      >
        {value ? <FileCheck2 className="size-5 text-[#2E9E68]" /> : <UploadCloud className="size-5 text-[#b7aaa0]" />}
        <span className="max-w-full truncate text-[13px] text-[#6d5d54]">{value?.name ?? hint}</span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => {
            onFileChange?.(event.target.files?.[0] ?? null);
          }}
        />
      </label>
    </FormField>
  );
}
