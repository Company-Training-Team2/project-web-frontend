import { FolderOpen } from "lucide-react";

// Was a hardcoded fake file list ("Booking_Contract_v2.pdf"...) with a
// no-op download button. There's no booking-scoped documents endpoint on
// the backend (DocumentsController is scoped to an Event, and MockBooking/
// BookingResponse don't carry the booking's eventId through to this
// screen), so this is an honest empty state instead of invented files —
// real event documents live at /event/documents.
export default function SharedDocumentsCard() {
  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Shared Documents</h3>

      <div className="mt-3 flex flex-col items-center gap-2 rounded-[10px] border border-dashed border-[#e5ded2] py-6 text-center">
        <FolderOpen className="size-5 text-[#a79a90]" />
        <p className="text-[13px] text-[#8b7e72]">No documents shared for this booking yet.</p>
      </div>
    </div>
  );
}
