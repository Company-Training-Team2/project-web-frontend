import { Search } from "lucide-react";

export default function DocumentSearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex items-center gap-3 px-4 md:px-6 pt-4">
      <div className="flex items-center gap-2 flex-1 rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 max-w-md">
        <Search size={16} className="text-[#8B716A]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by file name..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>
    </div>
  );
}
