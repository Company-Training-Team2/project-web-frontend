import Link from "next/link";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Vendor Portal", href: "/register?role=vendor" },
  { label: "Contact Support", href: "/ai-planner" },
];

export default function MarketplaceFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("hidden w-full border-t border-[#e5ded2] bg-[#faf6f0] px-10 py-8 lg:block", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Logo href="/home" />
          <p className="text-[12px] text-[#a79a90]">© 2026 EventHub Marketplace. All rights reserved.</p>
        </div>
        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-[#6d5d54] transition hover:text-[#af3718]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
