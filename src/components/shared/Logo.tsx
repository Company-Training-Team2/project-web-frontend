import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  tone?: "default" | "light";
  className?: string;
}

export default function Logo({ href = "/login", tone = "default", className }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", className)}
      aria-label="EventHub home"
    >
      <span
        className={cn(
          "font-serif text-[31px] font-bold leading-none tracking-[-0.02em]",
          isLight ? "text-white" : "text-[#b23a19]"
        )}
      >
        EventHub
      </span>
    </Link>
  );
}
