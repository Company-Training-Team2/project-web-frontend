import { Loader2 } from "lucide-react";

export default function SettingsHeader({
  onReset,
  onSave,
  isSaving,
}: {
  onReset: () => void;
  onSave: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622]">Admin Settings</h1>
        <p className="mt-1 text-sm text-[#8B716A]">
          Manage the core infrastructure, financials, and brand identity of the platform.
        </p>
      </div>

      <div className="flex shrink-0 gap-3">
        <button
          onClick={onReset}
          className="rounded-xl border border-[#DCCFC0] bg-white px-4 py-2 text-sm font-medium text-[#2B2622] hover:bg-[#EDE0D2]"
        >
          Reset Changes
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-xl bg-[#A3391C] px-4 py-2 text-sm font-medium text-white hover:bg-[#8a2f16] disabled:opacity-60"
        >
          {isSaving ? <Loader2 size={15} className="animate-spin" /> : null}
          Save Changes
        </button>
      </div>
    </div>
  );
}
