"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { DocumentType } from "@/services/document.service";

export default function DocumentUploadForm({
  onUpload,
  isSubmitting,
}: {
  onUpload: (file: File, type: DocumentType) => void;
  isSubmitting: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<DocumentType>("Contract");
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile(null);
    setType("Contract");
    setIsOpen(false);
  };

  const submit = () => {
    if (!file) return;
    onUpload(file, type);
    reset();
  };

  if (!isOpen) {
    return (
      <div className="px-4 md:px-6 pt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 bg-[#A3391C] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90"
        >
          <Upload size={14} />
          Upload Document
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 pt-4">
      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2B2622]">Upload Document</h3>
          <button onClick={reset} className="text-[#8B716A] hover:text-[#2B2622]">
            <X size={16} />
          </button>
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as DocumentType)}
          className="h-10 w-full rounded-lg border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
        >
          <option value="Contract">Contract</option>
          <option value="Invoice">Invoice</option>
          <option value="Receipt">Receipt</option>
        </select>

        <button
          onClick={() => inputRef.current?.click()}
          className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#DCCFC0] bg-white text-sm text-[#8B716A] hover:bg-[#EDE0D2]"
        >
          {file ? file.name : "Choose a file..."}
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <button
          onClick={submit}
          disabled={!file || isSubmitting}
          className="w-full rounded-lg bg-[#A3391C] py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Uploading…" : "Upload"}
        </button>
      </div>
    </div>
  );
}
