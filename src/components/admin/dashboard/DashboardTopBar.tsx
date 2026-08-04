import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react";

export default function DashboardTopBar() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white rounded-2xl px-4 md:px-5 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-gray-400 flex-1 max-w-xs">
        <Search size={16} />
        <input
          placeholder="Search vendors, users or events..."
          className="outline-none text-sm w-full placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 text-sm text-gray-600">
        <div className="hidden lg:flex items-center gap-6">
          <span>System Status</span>
          <span>Resources</span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Bell size={18} className="text-gray-500" />
          <HelpCircle size={18} className="text-gray-500" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <span className="hidden md:inline font-medium text-gray-700">
              Admin User
            </span>
            <ChevronDown size={14} className="hidden md:inline text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}