import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "neutral";

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  success: "border border-[#2E9E68]/40 bg-[#2E9E68]/10 text-[#1f7a4d]",
  warning: "border border-[#e0a1b3] bg-[#fbe7ee] text-[#af3768]",
  neutral: "border border-[#ded8d2] bg-[#f3ede3] text-[#6d5d54]",
};

export default function StatusPill({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: StatusVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
