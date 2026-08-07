import { ShieldAlert } from "lucide-react";

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

function ToggleRow({ label, description, checked, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="text-sm font-medium text-[#2B2622]">{label}</p>
        <p className="text-[12px] text-[#8B716A]">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-[#A3391C]" : "bg-[#DCCFC0]"}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white transition ${checked ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function SystemControlsCard({
  systemAlerts,
  vendorRequestPings,
  twoFactorRequired,
  onToggle,
}: {
  systemAlerts: boolean;
  vendorRequestPings: boolean;
  twoFactorRequired: boolean;
  onToggle: (key: "systemAlerts" | "vendorRequestPings" | "twoFactorRequired") => void;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
        <ShieldAlert size={18} className="text-[#A3391C]" />
        System Controls
      </h3>

      <div className="mt-2 divide-y divide-[#e5d9c8]">
        <ToggleRow
          label="System Alerts"
          description="Global infrastructure status"
          checked={systemAlerts}
          onToggle={() => onToggle("systemAlerts")}
        />
        <ToggleRow
          label="Vendor Request Pings"
          description="Instant alerts for new listings"
          checked={vendorRequestPings}
          onToggle={() => onToggle("vendorRequestPings")}
        />
        <ToggleRow
          label="2FA Authentication"
          description="Mandatory for all admin users"
          checked={twoFactorRequired}
          onToggle={() => onToggle("twoFactorRequired")}
        />
      </div>
    </div>
  );
}
