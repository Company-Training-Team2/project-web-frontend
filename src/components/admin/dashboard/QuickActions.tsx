import { UserPlus, FileDown, Megaphone } from "lucide-react";

const actions = [
  { icon: UserPlus, label: "Invite Vendor" },
  { icon: FileDown, label: "Export Report" },
  { icon: Megaphone, label: "System Announcement" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>

      <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 border rounded-xl p-3 md:p-4 hover:bg-[#F6F1EB] transition text-center md:text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-[#F6F1EB] flex items-center justify-center text-[#C95B2B] shrink-0">
              <action.icon size={16} />
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-700">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}