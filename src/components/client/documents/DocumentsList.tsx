"use client";

import { FileText, Receipt, Shield, Download } from "lucide-react";
import { toast } from "sonner";
import { documentService, EventDocument } from "@/services/document.service";

const TYPE_ICON: Record<EventDocument["type"], typeof Shield> = {
  Contract: Shield,
  Invoice: FileText,
  Receipt: Receipt,
};

const GROUPS: EventDocument["type"][] = ["Contract", "Invoice", "Receipt"];

// Real data — GET /events/{id}/documents. Download hits GET
// /documents/{id}/download for real; downloadUrl comes back null until the
// backend's blob-storage pipeline is configured (see document.service.ts),
// which is surfaced honestly instead of pretending a file exists.
export default function DocumentsList({ documents }: { documents: EventDocument[] }) {
  const handleDownload = async (doc: EventDocument) => {
    try {
      const result = await documentService.getDownloadLink(doc.id);
      if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank", "noopener,noreferrer");
      } else {
        toast.info("File storage isn't connected yet — this document has no downloadable file.");
      }
    } catch {
      toast.error("Couldn't get a download link for this document.");
    }
  };

  if (documents.length === 0) {
    return <p className="px-4 md:px-6 py-10 text-center text-sm text-[#8B716A]">No documents uploaded yet.</p>;
  }

  return (
    <div className="px-4 md:px-6 pt-6 space-y-6">
      {GROUPS.map((type) => {
        const items = documents.filter((d) => d.type === type);
        if (items.length === 0) return null;
        const Icon = TYPE_ICON[type];

        return (
          <div key={type}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={15} className="text-[#A3391C]" />
              <h2 className="font-semibold text-[#2B2622]">{type}s</h2>
            </div>

            <div className="space-y-2">
              {items.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#DCCFC0] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#A3391C]" />
                    </div>
                    <div className="min-w-0">
                      {doc.status ? (
                        <span className="text-[10px] font-semibold bg-[#EDE0D2] text-[#8B716A] px-2 py-0.5 rounded-full">
                          {doc.status}
                        </span>
                      ) : null}
                      <h3 className="font-medium text-sm text-[#2B2622] mt-1.5 truncate">{doc.fileName}</h3>
                      <p className="text-xs text-[#8B716A] mt-0.5">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                        {doc.amount != null ? ` · EGP ${doc.amount.toLocaleString()}` : ""}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-[#8B716A] hover:text-[#2B2622] shrink-0"
                    aria-label={`Download ${doc.fileName}`}
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
