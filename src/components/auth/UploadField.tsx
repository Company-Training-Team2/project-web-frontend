"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import FormField from "./FormField";

// Visual-only for now — there is no file upload endpoint on the backend yet,
// so this collects a file locally but does not attempt to send it anywhere.
// Promoted out of the old single-step VendorRegisterForm so both Step 1
// (compliance docs) and Step 3 (ID/license) of VendorRegisterWizard share it.
export default function UploadField({
  id,
  label,
  hint,
  accept,
}: {
  id: string;
  label: string;
  hint: string;
  accept: string;
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
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        />
      </label>
    </FormField>
  );
}
