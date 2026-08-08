import { Calendar, Users, Star } from "lucide-react";

export type EventItem = {
  id: string;
  tag: string;
  rating: string;
  name: string;
  date: string;
  guests: number;
  progress: number;
  spent: string;
  budget: string;
};

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden">
      <div className="relative h-40 bg-[#DCCFC0]">
        <span className="absolute top-3 left-3 text-[10px] font-semibold bg-[#F6ECE0] text-[#2B2622] px-2.5 py-1 rounded-full">
          {event.tag}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold bg-white/90 text-[#2B2622] px-2 py-1 rounded-full">
          <Star size={11} className="fill-[#B08D3E] text-[#B08D3E]" />
          {event.rating}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-[#2B2622]">
          {event.name}
        </h3>

        <div className="flex items-center gap-4 text-xs text-[#8B716A] mt-2">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {event.guests} Guests
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8B7E72]">Planning Progress</span>
            <span className="font-semibold text-[#A3391C]">
              {event.progress}%
            </span>
          </div>
          <div className="w-full bg-[#EDE0D2] rounded-full h-1.5">
            <div
              className="bg-[#A3391C] h-1.5 rounded-full"
              style={{ width: `${event.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#DCCFC0]">
          <div>
            <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">
              Budget Status
            </p>
            <p className="text-sm font-semibold text-[#2B2622] mt-0.5">
              {event.spent} / {event.budget}
            </p>
          </div>

          <button className="bg-[#A3391C] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 whitespace-nowrap">
            Manage Event
          </button>
        </div>
      </div>
    </div>
  );
}