"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/** Client-side auth gate for transactional booking-flow pages (reserve,
 * checkout, success, my bookings, booking details, payment methods, AI
 * planner, favorites, notifications, settings). No middleware.ts exists in
 * this codebase yet, so this is the first route-gating pattern introduced —
 * a plain useEffect redirect, consistent with AuthContext's synchronous
 * localStorage-backed check.
 *
 * Requires role === "customer" specifically, not just any authenticated
 * user — these are customer-only flows (a Vendor account has no
 * CustomerProfile, so e.g. GET /api/home/dashboard would just come back
 * empty/wrong for one, not a real "not allowed" signal). Mirrors
 * useRequireVendorAuth/useRequireAdminAuth's same role check, closing the
 * gap where a Vendor or Admin session could previously browse these
 * customer-only screens after signing in through /login. */
export function useRequireAuth() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const isCustomer = isAuthenticated && user?.role === "customer";

  useEffect(() => {
    // Wait for AuthContext to finish reading localStorage on mount — until
    // then isAuthenticated is provisionally false even for a logged-in user,
    // and redirecting on that would bounce them to /login every load.
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Signed in, but with the wrong role — send them to where they
    // actually belong instead of a customer-only screen.
    if (!isCustomer) {
      router.replace(user?.role === "vendor" ? "/vendor/dashboard" : "/login");
    }
  }, [isLoading, isAuthenticated, isCustomer, user?.role, router]);

  return { isAuthenticated: isCustomer, isLoading };
}
