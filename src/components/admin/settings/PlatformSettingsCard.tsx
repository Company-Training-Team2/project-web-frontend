import { Globe } from "lucide-react";

export default function PlatformSettingsCard({
  platformName,
  supportEmail,
  maxImagesPerWorkPost,
  maxPackagesPerWorkPost,
  language,
  onChange,
  onChangeLocal,
}: {
  platformName: string;
  supportEmail: string;
  maxImagesPerWorkPost: number;
  maxPackagesPerWorkPost: number;
  language: string;
  onChange: (patch: Partial<{
    platformName: string;
    supportEmail: string;
    maxImagesPerWorkPost: number;
    maxPackagesPerWorkPost: number;
  }>) => void;
  onChangeLocal: (patch: Partial<{ language: string }>) => void;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#2B2622]">
        <Globe size={18} className="text-[#A3391C]" />
        Platform Settings
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-[#2B2622]">Platform Name</label>
          <input
            value={platformName}
            onChange={(e) => onChange({ platformName: e.target.value })}
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

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-[#2B2622]">Max Images per Listing</label>
          <input
            type="number"
            min={1}
            value={maxImagesPerWorkPost}
            onChange={(e) => onChange({ maxImagesPerWorkPost: Number(e.target.value) })}
            className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>
        <div>
          <label className="text-sm text-[#2B2622]">Max Packages per Listing</label>
          <input
            type="number"
            min={1}
            value={maxPackagesPerWorkPost}
            onChange={(e) => onChange({ maxPackagesPerWorkPost: Number(e.target.value) })}
            className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-1.5 text-sm text-[#2B2622]">
          Default Platform Language
          <span className="rounded-full bg-[#DCCFC0] px-1.5 py-0.5 text-[10px] font-semibold text-[#5A4E43]">
            Coming soon
          </span>
        </label>
        {/* No localization field exists on the backend yet — kept visible and
            editable in-session (so the screen isn't missing a control the
            design calls for) but explicitly not sent by Save Changes. */}
        <select
          value={language}
          onChange={(e) => onChangeLocal({ language: e.target.value })}
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
