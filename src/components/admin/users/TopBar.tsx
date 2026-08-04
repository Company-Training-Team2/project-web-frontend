import { Search, Bell, HelpCircle } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-gray-400 flex-1 max-w-xs">
        <Search size={16} />
        <input
          placeholder="Search members, roles..."
          className="outline-none text-sm w-full placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span>System Status</span>
        <span>Resources</span>

        <div className="flex items-center gap-4">
          <Bell size={18} className="text-gray-500" />
          <HelpCircle size={18} className="text-gray-500" />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}