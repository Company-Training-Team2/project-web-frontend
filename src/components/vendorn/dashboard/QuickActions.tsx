import { CalendarPlus, FileText, Settings2 } from "lucide-react";

const actions = [
  { icon: CalendarPlus, label: "Add Availability", primary: true },
  { icon: FileText, label: "Send Quote", primary: false },
  { icon: Settings2, label: "Manage Services", primary: false },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
      {actions.map((a) => (
        <button
          key={a.label}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition
            ${
              a.primary
                ? "bg-[#A3391C] text-white hover:opacity-90"
                : "border border-[#DCCFC0] bg-[#F6ECE0] text-[#2B2622] hover:bg-[#EDE0D2]"
            }`}
        >
          <a.icon size={16} />
          {a.label}
        </button>
      ))}
    </div>
  );
}