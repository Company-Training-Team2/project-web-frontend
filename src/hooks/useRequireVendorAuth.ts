"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
      router.replace("/login");
    }
  }, [isLoading, isVendor, router]);

  return { isVendor, isLoading };
}
