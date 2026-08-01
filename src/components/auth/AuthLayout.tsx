import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  backHref?: string;
}

export default function AuthLayout({
  children,
  showBack = false,
  backHref = "/login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Header */}
      <header
        className="flex items-center justify-center relative px-4 py-4 border-b"
        style={{ borderColor: "#E8E0D0" }}
      >
        {showBack && (
          <Link
            href={backHref}
            className="absolute left-4 p-1.5 rounded-full transition-colors hover:bg-black/5"
            aria-label="Go back"
          >
            <ArrowLeft size={20} color="#1A1A1A" />
          </Link>
        )}
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: "#C1502E", fontFamily: "var(--font-heading)" }}
        >
          EventHub
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-5 py-8">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </main>
    </div>
  );
}
