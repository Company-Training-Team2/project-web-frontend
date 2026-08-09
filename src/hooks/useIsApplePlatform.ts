"use client";

import { useEffect, useState } from "react";

/** True for Mac, iPhone, or iPad — checked via userAgent only, deliberately
 * not navigator.platform: platform reflects the browser's actual host OS
 * and doesn't follow device-emulation/UA overrides (confirmed live —
 * Chrome's Android device emulation correctly rewrote userAgent to an
 * Android string but left platform as "MacIntel", the real host), so a
 * platform-based check gives Apple-platform false positives under any kind
 * of UA-spoofing/emulation and is generally the more deprecated of the two
 * signals anyway. iPadOS 13+ already identifies as "Macintosh" in its own
 * userAgent string (Apple's well-known desktop-Safari-passing behavior),
 * so the single substring check below covers it without any extra logic.
 *
 * Returns `null` = "haven't checked yet". The server has no `navigator`, so
 * this must run client-only in an effect — same tri-state pattern as
 * useBookingDraft()/AuthContext, so callers can tell "not determined yet"
 * apart from "determined, and it's false" instead of guessing on first
 * paint and having the server/client output disagree. */
export function useIsApplePlatform(): boolean | null {
  const [isApple, setIsApple] = useState<boolean | null>(null);

  useEffect(() => {
    const isApplePlatform = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsApple(isApplePlatform);
  }, []);

  return isApple;
}
