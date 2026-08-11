import Link from "next/link";
import { CalendarPlus, ClipboardList, Settings2 } from "lucide-react";

const actions = [
  { icon: CalendarPlus, label: "Manage Availability", href: "/vendor/calendar", primary: true },
  { icon: ClipboardList, label: "Booking Requests", href: "/vendor/bookings", primary: false },
  { icon: Settings2, label: "Manage Services", href: "/vendor/services", primary: false },
];

export default function QuickActions() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {actions.map((a) => (
        <Link
          key={a.label}
          href={a.href}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition ${
            a.primary
              ? "bg-[#A3391C] text-white hover:opacity-90"
              : "border border-[#DCCFC0] bg-[#F6ECE0] text-[#2B2622] hover:bg-[#EDE0D2]"
          }`}
        >
          <a.icon size={16} />
          {a.label}
        </Link>
      ))}
    </div>
  );
}
