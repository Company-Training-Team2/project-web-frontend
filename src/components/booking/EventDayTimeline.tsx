import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const TIMELINE = [
  { time: "10:00 AM", title: "Vendor Arrival & Load-in", description: "Main ballroom access via the service entrance for floral and lighting setup.", highlight: false },
  { time: "01:30 PM", title: "Catering Preparation", description: "Kitchen staff begins prep for cocktail hour hors d'oeuvres.", highlight: false },
  { time: "04:00 PM", title: "Main Ceremony Begins", description: "Processional in the Garden Courtyard followed by exchange of vows.", highlight: true },
  { time: "06:00 PM", title: "Reception & Dinner", description: "Guests transitioned to the Main Ballroom for the Signature Banquet.", highlight: false },
];

export default function EventDayTimeline() {
  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[18px] font-bold text-[#252323]">Event Day Timeline</h3>

      <div className="mt-4 space-y-5 border-l border-[#e5ded2] pl-5">
        {TIMELINE.map((item) => (
          <div key={item.time} className="relative">
            <span
              className={cn(
                "absolute -left-[26px] top-0.5 grid size-4 place-items-center rounded-full",
                item.highlight ? "bg-[#af3718] text-white" : "bg-[#e5ded2]"
              )}
            >
              {item.highlight ? <Heart className="size-2.5 fill-white" /> : null}
            </span>
            <p className="text-[12px] font-bold text-[#af3718]">{item.time}</p>
            <p className="text-[14px] font-bold text-[#252323]">{item.title}</p>
            <p className="text-[13px] text-[#6d5d54]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
