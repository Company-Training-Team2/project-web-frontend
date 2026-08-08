import { Shield, Share2, Download, ChevronRight } from "lucide-react";

export default function ContractCard() {
  return (
    <div className="px-4 md:px-6 pt-6">
      <div className="flex items-center gap-2 mb-3">
        <Shield size={15} className="text-[#A3391C]" />
        <h2 className="font-semibold text-[#2B2622]">Contracts</h2>
      </div>

      <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#DCCFC0] flex items-center justify-center shrink-0">
              <Shield size={16} className="text-[#A3391C]" />
            </div>

            <div className="min-w-0">
              <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                ACTIVE
              </span>
              <h3 className="font-medium text-sm text-[#2B2622] mt-1.5 truncate">
                Grand Plaza Venue Agreement
              </h3>
              <p className="text-xs text-[#8B716A] mt-0.5">
                Signed Oct 12, 2023 · 2.4 MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="text-[#8B716A] hover:text-[#2B2622]">
              <Share2 size={15} />
            </button>
            <button className="text-[#8B716A] hover:text-[#2B2622]">
              <Download size={15} />
            </button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#DCCFC0] space-y-2">
          {[
            { name: "Catering Service Rider", note: "Updated 2 days ago" },
            { name: "Floral Design Scope", note: "Sep 26, 2023" },
          ].map((doc) => (
            <button
              key={doc.name}
              className="w-full flex items-center justify-between text-left hover:bg-[#EDE0D2] rounded-lg px-2 py-2 -mx-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Shield size={13} className="text-[#8B716A] shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-[#2B2622] truncate">
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-[#8B7E72]">{doc.note}</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-[#8B716A] shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}