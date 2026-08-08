import { Search } from "lucide-react";

export default function ApprovalsSearch() {
  return (
    <div className="px-4 md:px-6 pt-4">
      <div className="flex items-center gap-2 rounded-xl border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 md:max-w-md">
        <Search size={16} className="text-[#8B716A]" />
        <input
          placeholder="Search business name or ID..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>
    </div>
  );
}