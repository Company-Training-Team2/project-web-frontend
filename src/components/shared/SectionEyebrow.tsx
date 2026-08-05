import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  tone?: "rust" | "gold" | "muted";
  className?: string;
}

/** The recurring small uppercase/tracked-out label used throughout every
 * screen ("2,500+ VERIFIED", "HEAD COUNT", "STEP 3 OF 3", "LIVE DOSSIER"...). */
export default function SectionEyebrow({ children, tone = "rust", className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.14em]",
        tone === "rust" && "text-[#af3718]",
        tone === "gold" && "text-[#c59c42]",
        tone === "muted" && "text-[#a79a90]",
        className
      )}
    >
      {children}
    </p>
  );
}
