import Link from "next/link";
import { Search, Bell } from "lucide-react";

export default function ServicesTopBar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex max-w-md flex-1 items-center gap-2 rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-2.5 text-[#8B716A]">
        <Search size={16} />
        <input
          placeholder="Search services..."
          className="w-full bg-transparent text-sm text-[#2B2622] outline-none placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button className="relative text-[#8B716A] hover:text-[#2B2622]" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <Link
          href="/vendor/services/new"
          className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#A3391C] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          + Add New Service
        </Link>
      </div>
    </div>
  );
}
