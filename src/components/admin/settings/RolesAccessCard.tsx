import { KeyRound } from "lucide-react";
import { toast } from "sonner";

const ROLES = [
  { label: "Administrators", count: "04" },
  { label: "Moderators", count: "12" },
  { label: "Support Agents", count: "28" },
];

export default function RolesAccessCard() {
  return (
    <div className="rounded-[16px] bg-[#1B2421] p-5 text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold">Roles &amp; Access</h3>
        <KeyRound size={18} className="text-white/60" />
      </div>

      <div className="mt-3 divide-y divide-white/10">
        {ROLES.map((role) => (
          <div key={role.label} className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-white/80">{role.label}</span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs">{role.count}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => toast.info("Permissions editor — not wired up yet.")}
        className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-medium text-[#1B2421] hover:bg-white/90"
      >
        Edit Permissions
      </button>
    </div>
  );
}
