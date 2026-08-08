import { Calendar, MapPin, Users } from "lucide-react";

const timeline = [
  { title: "Initial Consultation", status: "Completed · Jan 15", color: "bg-green-600" },
  { title: "Venue Contract Signed", status: "Completed · Feb 02", color: "bg-green-600" },
  { title: "Catering Tasting", status: "Upcoming · Mar 25", color: "bg-[#A3391C]" },
  { title: "Final Production Walkthrough", status: "Planned · Apr 15", color: "bg-[#DCCFC0]" },
];

export default function BookingDetailsPanel() {
  return (
    <div className="hidden lg:flex w-72 border-l border-[#DCCFC0] bg-[#F6ECE0] flex-col overflow-y-auto shrink-0">
      <div className="p-5 border-b border-[#DCCFC0]">
        <h3 className="font-serif font-semibold text-[#2B2622]">
          Booking Reference #EHB-9021
        </h3>

        <div className="space-y-2.5 mt-4 text-sm">
          <div className="flex items-center gap-2 text-[#2B2622]">
            <Calendar size={14} className="text-[#A3391C] shrink-0" />
            May 24, 2025 · 4:00 PM
          </div>
          <div className="flex items-center gap-2 text-[#2B2622]">
            <MapPin size={14} className="text-[#A3391C] shrink-0" />
            The Heritage Ballroom, London
          </div>
          <div className="flex items-center gap-2 text-[#2B2622]">
            <Users size={14} className="text-[#A3391C] shrink-0" />
            180 Guests (Confirmed)
          </div>
        </div>
      </div>

      <div className="p-5 border-b border-[#DCCFC0]">
        <h4 className="font-semibold text-sm text-[#2B2622] mb-2">
          Package Selected
        </h4>

        <div className="rounded-xl border border-[#DCCFC0] bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#2B2622]">
              Signature Banquet
            </span>
            <span className="text-sm font-semibold text-[#A3391C]">
              £18,500
            </span>
          </div>
          <p className="text-xs text-[#8B716A] mt-1">
            Includes 5-course curated menu, full floral production, and
            dedicated concierge.
          </p>

          <div className="w-full bg-[#EDE0D2] rounded-full h-1.5 mt-3">
            <div className="bg-[#A3391C] h-1.5 rounded-full" style={{ width: "46%" }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#8B7E72] mt-1">
            <span>Deposit Paid: £8,475</span>
            <span>Remaining</span>
          </div>
        </div>
      </div>

      <div className="p-5 border-b border-[#DCCFC0]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm text-[#2B2622]">
            Shared Files
          </h4>
          <button className="text-xs text-[#A3391C] font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded-lg bg-[#DCCFC0]" />
          <div className="h-16 rounded-lg bg-[#DCCFC0]" />
        </div>
      </div>

      <div className="p-5">
        <h4 className="font-semibold text-sm text-[#2B2622] mb-3">
          Event Timeline
        </h4>

        <div className="space-y-4">
          {timeline.map((t, i) => (
            <div key={t.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className={`w-2.5 h-2.5 rounded-full mt-1 ${t.color}`} />
                {i !== timeline.length - 1 && (
                  <span className="w-px flex-1 bg-[#DCCFC0] mt-1" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-sm text-[#2B2622]">{t.title}</p>
                <p className="text-[10px] text-[#8B7E72]">{t.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}