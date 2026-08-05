import { Download, FileText, Map } from "lucide-react";

const DOCUMENTS = [
  { name: "Booking_Contract_v2.pdf", meta: "Uploaded Sep 12 • 2.4 MB", icon: FileText },
  { name: "Floor_Plan_Ballroom.pdf", meta: "Uploaded Sep 14 • 1.1 MB", icon: Map },
];

export default function SharedDocumentsCard() {
  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Shared Documents</h3>

      <div className="mt-3 space-y-2">
        {DOCUMENTS.map(({ name, meta, icon: Icon }) => (
          <div key={name} className="flex items-center justify-between rounded-[10px] border border-[#e5ded2] p-3">
            <div className="flex items-center gap-2.5">
              <Icon className="size-4 text-[#6d5d54]" />
              <div>
                <p className="text-[13px] font-bold text-[#252323]">{name}</p>
                <p className="text-[11px] text-[#a79a90]">{meta}</p>
              </div>
            </div>
            {/* Mock file list — download is a no-op, no real file storage yet. */}
            <button aria-label={`Download ${name}`} className="text-[#6d5d54] hover:text-[#af3718]">
              <Download className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
