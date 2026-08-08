import { Bell, Menu } from "lucide-react";

export default function DashboardTopBar() {
  return (
    <div className="flex items-center justify-between rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 md:hidden">
      <span className="font-serif font-bold text-[#A3391C] text-lg">
        EventHub
      </span>

      <div className="flex items-center gap-3">
        <Bell size={18} className="text-[#8B716A]" />
        <Menu size={18} className="text-[#8B716A]" />
      </div>
    </div>
  );
}