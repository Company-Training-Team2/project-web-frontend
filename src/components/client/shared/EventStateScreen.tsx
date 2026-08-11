import Link from "next/link";
import { CalendarPlus, WifiOff } from "lucide-react";

// Shared "no active event" / "couldn't load" state for every /event/* page —
// all of them need a real Event to show anything, and a customer with zero
// events yet (or a failed request) is a real state, not a loading blip.
export default function EventStateScreen({ status }: { status: "empty" | "error" }) {
  if (status === "empty") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-[#F6ECE0] text-[#A3391C]">
          <CalendarPlus size={24} />
        </div>
        <h2 className="font-serif text-xl font-bold text-[#2B2622]">No events yet</h2>
        <p className="max-w-xs text-sm text-[#8B716A]">
          Create your first event to start tracking its budget, checklist, timeline, and vendors.
        </p>
        <Link
          href="/event/new"
          className="mt-2 rounded-xl bg-[#A3391C] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Create an Event
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-[#fbeee9] text-[#8a3b3b]">
        <WifiOff size={24} />
      </div>
      <h2 className="font-serif text-xl font-bold text-[#2B2622]">Couldn&apos;t load this event</h2>
      <p className="max-w-xs text-sm text-[#8B716A]">Check your connection and reload the page.</p>
    </div>
  );
}
