import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LOADING_PROGRESS_MS = 1800;

function FlameMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 178" aria-hidden="true" className={className}>
      <path
        d="M85 172c-28-27-50-54-41-89 9 23 25 33 45 37-31-34-30-65 0-104 2 34 22 48 41 72 24 31 13 62-45 84Z"
        fill="#f6f7f4"
      />
      <path
        d="M83 156c21-33 14-56-12-78 10 26-1 46-20 61 8 12 18 16 32 17Z"
        fill="#102c1f"
      />
      <path
        d="M86 18c-3 49 56 59 38 111 28-24 29-59 2-87-13-13-25-20-40-24Z"
        fill="#eef1ed"
      />
      <path d="M86 0l8 18 17 8-17 8-8 18-8-18-17-8 17-8 8-18Z" fill="#f8faf7" />
      <path d="M54 28l5 10 10 5-10 5-5 10-5-10-10-5 10-5 5-10Z" fill="#f8faf7" />
      <path d="M128 38l5 10 10 5-10 5-5 10-5-10-10-5 10-5 5-10Z" fill="#f8faf7" />
    </svg>
  );
}

interface LoadingScreenProps {
  /** Full-brand entrance screen (route loading, initial app boot). Set false for a compact inline state inside existing UI (e.g. a Suspense fallback within a form). */
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingScreen({ fullScreen = true, className }: LoadingScreenProps) {
  if (!fullScreen) {
    return (
      <div
        role="status"
        aria-label="Loading"
        className={cn("flex min-h-[240px] flex-col items-center justify-center gap-3", className)}
      >
        <Loader2 className="size-6 animate-spin text-[#af3718]" />
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading EventHub"
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#102b1f] text-white sm:min-h-[852px]",
        className
      )}
    >
      <div className="mt-[215px] flex flex-col items-center">
        <FlameMark className="h-[178px] w-[170px] drop-shadow-[0_8px_18px_rgba(255,255,255,0.22)]" />
        <h1 className="mt-6 font-serif text-[68px] font-normal leading-none tracking-[-0.06em] text-[#f4f7f1]">
          EventHub
        </h1>
      </div>

      <div className="absolute bottom-[78px] flex flex-col items-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.48em] text-[#c59c42]">
          The Art of Celebration
        </p>
        <div className="mt-[28px] h-1.5 w-[176px] overflow-hidden rounded-full bg-[#5c725f]">
          <div
            className="h-full w-0 rounded-full bg-[#d2a954] [animation-fill-mode:forwards]"
            style={{ animation: `eventhub-progress ${LOADING_PROGRESS_MS}ms ease-out` }}
          />
        </div>
      </div>
    </div>
  );
}
