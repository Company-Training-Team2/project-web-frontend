"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/** Client-side auth gate for the admin portal — redirects to /admin/login
 * unless the signed-in user's role is "admin". None of the admin pages had
 * any gating before this (they were wide open at /dashboard, /users,
 * /analytics, /admin/reports); this is the first one, applied uniformly now
 * that a real Admin Login page exists to redirect to. */
export function useRequireAdminAuth() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const isAdmin = isAuthenticated && user?.role === "admin";

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[useRequireAdminAuth]", { isAuthenticated, role: user?.role, isAdmin });
    if (!isAdmin) {
      router.replace("/admin/login");
    }
  }, [isAdmin, router, isAuthenticated, user]);

  return { isAdmin };
}
