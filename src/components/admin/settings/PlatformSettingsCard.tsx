import { Globe } from "lucide-react";

export default function PlatformSettingsCard({
  siteName,
  supportEmail,
  language,
  onChange,
}: {
  siteName: string;
  supportEmail: string;
  language: string;
  onChange: (patch: Partial<{ siteName: string; supportEmail: string; language: string }>) => void;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
        <Globe size={18} className="text-[#A3391C]" />
        Platform Settings
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-[#2B2622]">Site Name</label>
          <input
            value={siteName}
            onChange={(e) => onChange({ siteName: e.target.value })}
            className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>
        <div>
          <label className="text-sm text-[#2B2622]">Support Email</label>
          <input
            value={supportEmail}
            onChange={(e) => onChange({ supportEmail: e.target.value })}
            className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-[#2B2622]">Default Platform Language</label>
        <select
          value={language}
          onChange={(e) => onChange({ language: e.target.value })}
          className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
        >
          <option>English (US)</option>
          <option>Arabic (EG)</option>
          <option>French (FR)</option>
        </select>
      </div>
    </div>
  );
}
