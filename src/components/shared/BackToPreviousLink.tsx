"use client";

import { useRouter } from "next/navigation";

/**
 * "← Back" control for standalone pages (Terms, Privacy) that can be reached
 * from more than one place (RegisterForm's checkbox copy, VendorRegisterWizard,
 * the Login footer, …). A hardcoded destination like `/register-option` sent
 * everyone back to role-selection regardless of where they actually came
 * from, dropping whatever form they were filling in. router.back() returns
 * to the actual previous page/history entry instead.
 */
export default function BackToPreviousLink({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()} className={className}>
      ← Back
    </button>
  );
}
