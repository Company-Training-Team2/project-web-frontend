"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { MAIN_NAV_LINKS } from "./mainNavLinks";

/**
 * Mobile replacement for the desktop nav row (MAIN_NAV_LINKS) that
 * MarketplaceHeader/the Home header hide below `lg:`. A hamburger button
 * opens a right-side slide-in panel with the exact same links — this is a
 * responsive site, not a native app, so "mobile nav" here means "the same
 * nav, reachable a different way," not a separate app-style tab bar.
 */
export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Portal target must wait for the client mount — SSR has no document.body
  // to render into yet.
  useEffect(() => setMounted(true), []);

  // Lock background scroll while the drawer is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="text-[#5A524A] transition-colors hover:text-[#A3391C] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Portalled to <body> — rendering the fixed backdrop/panel as a plain
          child here would trap them inside whichever header wraps this
          button, since that header's `backdrop-blur` creates a new
          containing block for `position: fixed` descendants (same effect
          as `transform`), collapsing them to the header's own height
          instead of the full viewport. */}
      {mounted
        ? createPortal(
            <>
              <div
                aria-hidden={!open}
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden ${
                  open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              />

              <div
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className={`fixed inset-y-0 right-0 z-[70] flex h-dvh w-[82%] max-w-[340px] flex-col bg-[#faf6f0] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
                  open ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#e5ded2] px-5 py-4">
                  <span className="font-serif text-xl font-bold text-[#A3391C]">EventHub</span>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="text-[#5A524A] hover:text-[#A3391C]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                  {MAIN_NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#252323] transition hover:bg-[#efe6da] hover:text-[#A3391C]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-2 border-t border-[#e5ded2] px-3 py-4">
                  {isAuthenticated ? (
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-medium text-[#252323] hover:bg-[#efe6da]"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#A3391C] text-[11px] font-bold text-white">
                        {user?.name?.[0]?.toUpperCase() ?? "U"}
                      </span>
                      My Profile
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-[15px] font-bold text-[#A3391C] hover:bg-[#efe6da]"
                    >
                      Sign In
                    </Link>
                  )}
                  <Link
                    href="/register-option"
                    onClick={() => setOpen(false)}
                    className="block rounded-md bg-[#A3391C] px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-[#8B2E17]"
                  >
                    Partner with Us
                  </Link>
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </>
  );
}
