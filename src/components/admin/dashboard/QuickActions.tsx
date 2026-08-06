import { UserPlus, FileDown, Megaphone } from "lucide-react";

const actions = [
  { icon: UserPlus, label: "Invite Vendor" },
  { icon: FileDown, label: "Export Report" },
  { icon: Megaphone, label: "System Announcement" },
];

export default function QuickActions() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Quick Actions</h2>

      <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 border border-[#DCCFC0] rounded-xl p-3 md:p-4 hover:bg-[#EDE0D2] transition text-center md:text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-[#A3391C] shrink-0">
              <action.icon size={16} />
            </div>
            <span className="text-xs md:text-sm font-medium text-[#2B2622]">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}