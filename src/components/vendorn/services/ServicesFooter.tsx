import Link from "next/link";

export default function ServicesFooter() {
  return (
    <footer className="mt-10 flex flex-col gap-3 border-t border-[#DCCFC0] pt-6 text-xs text-[#8B716A] sm:flex-row sm:items-center sm:justify-between">
      <span className="font-semibold text-[#2B2622]">EventHub</span>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/privacy" className="hover:text-[#2B2622]">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-[#2B2622]">
          Terms of Service
        </Link>
      </div>

      <span>© 2026 EventHub Vendor Portal. All rights reserved.</span>
    </footer>
  );
}