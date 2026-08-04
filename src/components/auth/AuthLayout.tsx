import { ReactNode } from "react";
import Logo from "@/components/shared/Logo";
import BackButton from "./BackButton";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  backHref?: string;
  showHeader?: boolean;
  showStatusBar?: boolean;
  className?: string;
}

export default function AuthLayout({
  children,
  showBack = false,
  backHref = "/login",
  showHeader = true,
  showStatusBar = false,
  className,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#1f1f1f] text-[#252323] sm:grid sm:place-items-center lg:bg-[#efe6da] lg:p-8">
      <div
        className="relative min-h-screen w-full overflow-hidden bg-[#e9dfd1] sm:min-h-[852px] sm:w-[393px] sm:shadow-2xl lg:grid lg:min-h-[760px] lg:w-[min(1120px,calc(100vw-64px))] lg:grid-cols-[1fr_438px] lg:rounded-[22px] lg:bg-[#e9dfd1] lg:shadow-[0_30px_90px_rgba(47,35,24,0.18)]"
      >
        <aside className="relative hidden overflow-hidden bg-[#102b1f] text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(244,247,241,0.12),transparent_26%),linear-gradient(135deg,rgba(16,43,31,0.98),rgba(16,43,31,0.8)_48%,rgba(175,55,24,0.38))]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent,rgba(8,23,16,0.9))]" />

          <div className="relative z-10">
            <Logo tone="light" />
          </div>

          <div className="relative z-10 max-w-[430px] space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.48em] text-[#c59c42]">
              The Art of Celebration
            </p>
            <h1 className="font-serif text-[52px] font-bold leading-[1.04] tracking-[-0.04em]">
              Curated events with a graceful first step.
            </h1>
            <p className="max-w-[360px] text-[17px] leading-7 text-white/72">
              A responsive desktop experience that preserves the mobile Figma palette, serif
              branding, and calm EventHub rhythm.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3">
            {["Venues", "Vendors", "Bookings"].map((item) => (
              <div
                key={item}
                className="rounded-[14px] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                  EventHub
                </p>
                <p className="mt-2 text-[15px] font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <section
          className={cn(
            "relative min-h-screen overflow-hidden bg-[#e9dfd1] lg:min-h-[760px]",
            className
          )}
        >
          {showStatusBar ? (
            <div className="flex h-11 items-center justify-between px-7 text-[15px] font-medium text-black lg:hidden">
              <span>9:41</span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-4 skew-x-[-18deg] bg-black" />
                <span className="h-3 w-4 rounded-sm border-2 border-black" />
              </span>
            </div>
          ) : null}

          {showHeader ? (
            <header className="relative flex h-[60px] items-center justify-center border-b border-[#ded2c3] bg-white">
              {showBack ? <BackButton href={backHref} /> : null}
              <Logo />
            </header>
          ) : null}

          {children}
        </section>
      </div>
    </main>
  );
}
