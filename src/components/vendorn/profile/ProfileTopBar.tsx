import { Search, Bell, Mail } from "lucide-react";

export default function ProfileTopBar({ businessName }: { businessName: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 md:px-5 py-3">
      <div className="flex items-center gap-2 text-[#8B716A] flex-1 max-w-xs">
        <Search size={16} />
        <input
          placeholder="Search profile assets..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 text-sm text-[#2B2622]">
        <div className="flex items-center gap-3 md:gap-4">
          <Bell size={18} className="text-[#8B716A]" />
          <Mail size={18} className="text-[#8B716A]" />
          <span className="hidden md:block font-medium truncate max-w-[160px]">
            {businessName || "Your Business"}
          </span>
        </div>
      </div>
    </div>
  );
}
