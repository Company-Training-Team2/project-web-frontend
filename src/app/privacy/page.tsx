import Link from "next/link";
import Logo from "@/components/shared/Logo";

// Minimal placeholder — RegisterForm links here from its "Privacy Policy"
// checkbox copy; this just needs to exist so that link isn't a 404. Replace
// with real legal copy when it's ready.
export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#faf9f7] px-6 py-16">
      <Logo />
      <div className="mt-10 max-w-2xl space-y-4 text-[#252323]">
        <h1 className="font-serif text-[28px] font-bold">Privacy Policy</h1>
        <p className="text-[15px] leading-[1.6] text-[#6d5d54]">
          EventHub&apos;s Privacy Policy is being finalized. Please check back soon.
        </p>
        <Link href="/register-option" className="inline-block text-[14px] font-medium text-[#af3718] hover:underline">
          ← Back
        </Link>
      </div>
    </main>
  );
}
