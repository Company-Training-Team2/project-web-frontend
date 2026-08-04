import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="absolute left-[22px] top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center text-[#b23a19] transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b23a19]/30"
      aria-label="Go back"
    >
      <ArrowLeft className="size-5 stroke-[2.2]" />
    </Link>
  );
}
