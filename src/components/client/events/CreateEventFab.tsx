import Link from "next/link";
import { Plus } from "lucide-react";

export default function CreateEventFab() {
  return (
    <Link
      href="/event/new"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 flex items-center gap-2 bg-[#A3391C] text-white rounded-full pl-4 pr-5 py-3.5 shadow-lg hover:opacity-90 z-30"
    >
      <Plus size={18} />
      <span className="text-sm font-semibold whitespace-nowrap">
        Create New Event
      </span>
    </Link>
  );
}