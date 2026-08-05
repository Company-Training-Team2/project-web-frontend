"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/** Client-side auth gate for transactional booking-flow pages (reserve,
 * checkout, success, my bookings, booking details, payment methods, AI
 * planner). No middleware.ts exists in this codebase yet, so this is the
 * first route-gating pattern introduced — a plain useEffect redirect,
 * consistent with AuthContext's synchronous localStorage-backed check. */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated };
}
