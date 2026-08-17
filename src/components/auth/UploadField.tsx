"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import FormField from "./FormField";

// Real upload: the selected File is reported to the parent via onFileChange
// so VendorRegisterWizard can attach it to the multipart registration
// request (RegisterRequest.cs's BusinessLogo/CoverImage/CommercialRegistration/
// NationalId/BusinessLicense fields, saved by IFileStorageService). Previously
// this only tracked the filename locally for display and never sent the file
// anywhere — see git history for the old "visual-only" version.
export default function UploadField({
  id,
  label,
  hint,
  accept,
  onFileChange,
}: {
  id: string;
  label: string;
  hint: string;
  accept: string;
  onFileChange?: (file: File | null) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <FormField id={id} label={label}>
      <label
        htmlFor={id}
        className="flex h-[92px] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[10px] border border-dashed border-[#ded8d2] bg-white px-[14px] text-center transition hover:border-[#af3718]"
      >
        <UploadCloud className="size-5 text-[#b7aaa0]" />
        <span className="text-[13px] text-[#6d5d54]">{fileName ?? hint}</span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setFileName(file?.name ?? null);
            onFileChange?.(file);
          }}
        />
      </label>
    </FormField>
  );
}
