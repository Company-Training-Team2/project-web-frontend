import { Search, SlidersHorizontal } from "lucide-react";

export default function EventsSearchBar() {
  return (
    <div className="flex items-center gap-3 px-4 md:px-6 pt-4">
      <div className="flex items-center gap-2 flex-1 rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 max-w-md">
        <Search size={16} className="text-[#8B716A]" />
        <input
          placeholder="Find an event..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>

      <button className="rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] p-3 text-[#8B716A] hover:bg-[#EDE0D2] shrink-0">
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}