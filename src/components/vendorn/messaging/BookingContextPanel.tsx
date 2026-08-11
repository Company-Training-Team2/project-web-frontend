import { Calendar, MapPin, Users, FileImage } from "lucide-react";
import { MockConversation } from "@/lib/mock/vendorMessagingScript";

const timelineDot: Record<string, string> = {
  completed: "bg-green-600",
  upcoming: "bg-[#A3391C]",
  planned: "bg-[#DCCFC0]",
};

export default function BookingContextPanel({ conversation }: { conversation: MockConversation }) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#8B7E72]">Booking Reference</p>
        <p className="font-serif text-lg font-bold text-[#2B2622]">{conversation.bookingReference}</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2.5">
          <Calendar size={15} className="text-[#A3391C] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-[#8B7E72]">Date &amp; Time</p>
            <p className="text-[#2B2622] font-medium">{conversation.bookingDateTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <MapPin size={15} className="text-[#A3391C] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-[#8B7E72]">Location</p>
            <p className="text-[#2B2622] font-medium">{conversation.location}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Users size={15} className="text-[#A3391C] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase text-[#8B7E72]">Guest Count</p>
            <p className="text-[#2B2622] font-medium">{conversation.guestCount}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#DCCFC0] bg-white p-3">
        <p className="text-[10px] uppercase tracking-wide text-[#8B7E72] mb-2">Package Selected</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-[#A3391C] text-sm">{conversation.package.name}</p>
          <p className="font-bold text-[#2B2622] text-sm">{conversation.package.price}</p>
        </div>
        <p className="text-xs text-[#8B7E72] mt-1">{conversation.package.description}</p>

        <div className="mt-3 h-1.5 rounded-full bg-[#EDE0D2] overflow-hidden">
          <div
            className="h-full bg-[#A3391C]"
            style={{ width: `${conversation.package.percentPaid}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5 text-[10px] text-[#8B7E72]">
          <span>Deposit paid {conversation.package.depositPaid}</span>
          <span>{conversation.package.depositRemaining}</span>
        </div>
      </div>

      {conversation.sharedFiles.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#8B7E72] mb-2">Shared Files</p>
          <div className="grid grid-cols-2 gap-2">
            {conversation.sharedFiles.map((f) => (
              <div
                key={f.name}
                className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-[#DCCFC0] bg-white h-20 p-2 text-center"
              >
                <FileImage size={18} className="text-[#8B716A]" />
                <p className="text-[10px] text-[#2B2622] truncate w-full">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#8B7E72] mb-3">Event Timeline</p>
        <div className="space-y-3">
          {conversation.timeline.map((step) => (
            <div key={step.title} className="flex gap-2.5">
              <span className={`mt-1 size-2 rounded-full shrink-0 ${timelineDot[step.status]}`} />
              <div>
                <p className="text-xs font-semibold text-[#2B2622]">{step.title}</p>
                <p className="text-[10px] text-[#8B7E72]">{step.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
