import { WifiOff } from "lucide-react";

// Shown whenever a real backend call fails, instead of ever letting a
// number silently default to "0"/"—" that could be mistaken for genuine
// (if empty) data. The whole point is to make "not connected" impossible
// to confuse with "connected and empty."
export default function AdminConnectionError({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[16px] border border-[#e3aea0] bg-[#fbeee9] px-4 py-3 text-sm text-[#8a3b3b]">
      <WifiOff size={16} className="shrink-0" />
      <span>
        Couldn&apos;t reach the server for {label}. These aren&apos;t live numbers — check the backend/database
        connection and reload.
      </span>
    </div>
  );
}
