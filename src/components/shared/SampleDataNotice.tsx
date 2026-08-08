import { WifiOff } from "lucide-react";

// Lighter-touch than ConnectionError — for public browsing screens
// (Home/Browse/Search/Vendor Details) that gracefully fall back to
// src/lib/mock fixtures when the real WorkPost endpoint is unreachable, so
// browsing still "works." That fallback is intentional and fine for a
// guest, but it must never be silently indistinguishable from real listings
// — this small inline note is the difference.
export default function SampleDataNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-center gap-1.5 text-[12px] text-[#8B7E72] ${className}`}>
      <WifiOff size={12} className="shrink-0" />
      Showing sample listings — couldn&apos;t reach the server for live ones.
    </p>
  );
}
