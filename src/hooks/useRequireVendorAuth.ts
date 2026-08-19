"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { notifyLoginRequired } from "@/lib/authToast";

/** Client-side auth gate for the vendor portal (/vendor/*) — none of these
 * pages had any gating before this, so any visitor (logged out, a Customer,
 * or an Admin) could load them. Mirrors useRequireAdminAuth's pattern:
 * vendors sign in through the same /login as customers (no separate vendor
 * login screen exists), so that's the redirect target. */
export function useRequireVendorAuth() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const isVendor = isAuthenticated && user?.role === "vendor";

  useEffect(() => {
    // Wait for AuthContext to finish reading localStorage on mount — see the
    // comment in useRequireAuth.ts for why this matters.
    if (!isLoading && !isVendor) {
      // Only the "not signed in at all" case gets the friendly nudge — a
      // customer/admin account hitting a vendor-only page is a wrong-role
      // bounce, not a "you forgot to log in" one.
      if (!isAuthenticated) notifyLoginRequired();
      router.replace("/login");
    }
  }, [isLoading, isVendor, router]);

  return { isVendor, isLoading };
}
