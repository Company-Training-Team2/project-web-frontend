import { Search, Bell, Link } from "lucide-react";

export default function ServicesTopBar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-2 text-[#8B716A] border border-[#DCCFC0] bg-[#F6ECE0] rounded-xl px-4 py-2.5 flex-1 max-w-md">
        <Search size={16} />
        <input
          placeholder="Search services, bookings..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="relative text-[#8B716A] hover:text-[#2B2622]">
          <Bell size={18} />
        </button>

        <Link
  href="/vendor/services/new"
  className="flex items-center gap-2 bg-[#A3391C] text-white rounded-xl px-4 py-2.5 font-medium hover:opacity-90 text-sm whitespace-nowrap"
>
  + Add New Service
</Link>
      </div>
    </div>
  );
}