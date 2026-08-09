"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";

import { APPLE_CLIENT_ID } from "@/config/env";
import { useAuth } from "@/context/AuthContext";
import { getAuthErrorMessage } from "@/services/auth.service";

// Apple's JS SDK isn't in the DOM lib's type defs — declared just enough of
// its shape to call it, not the whole SDK surface.
declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: {
          clientId: string;
          scope: string;
          redirectURI: string;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<{ authorization: { id_token: string } }>;
      };
    };
  }
}

/** Apple doesn't ship a rendered-button widget the way Google does — any
 * element can call AppleID.auth.signIn() on click, so this is styled to
 * match the app's own pill-button language instead of Apple's HIG button
 * asset. Popup mode still requires a registered HTTPS Return URL even
 * though it never navigates the page away — that's Apple's own
 * requirement, not something to route around; it's why this can't work
 * over plain http://localhost in local dev, only on the deployed HTTPS
 * origin registered in the Apple Developer portal. */
export default function AppleSignInButton({ redirectTo }: { redirectTo?: string }) {
  const { loginWithApple } = useAuth();
  const [scriptReady, setScriptReady] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!scriptReady || !APPLE_CLIENT_ID || !window.AppleID) return;
    window.AppleID.auth.init({
      clientId: APPLE_CLIENT_ID,
      scope: "email",
      redirectURI: window.location.origin,
      usePopup: true,
    });
  }, [scriptReady]);

  const handleClick = async () => {
    if (!window.AppleID) return;
    setIsSigningIn(true);
    try {
      const result = await window.AppleID.auth.signIn();
      await loginWithApple(result.authorization.id_token, redirectTo);
    } catch (error) {
      // A cancelled popup rejects with Apple's own {error: "..."} shape, not
      // an axios error — getAuthErrorMessage's fallback covers that fine.
      toast.error(getAuthErrorMessage(error, "Apple sign-in failed. Try again."));
    } finally {
      setIsSigningIn(false);
    }
  };

  if (!APPLE_CLIENT_ID) {
    return (
      <button
        type="button"
        disabled
        title="Apple sign-in isn't configured yet"
        className="h-[52px] w-full max-w-[300px] rounded-[24px] border border-[#d7cab9] bg-[#f5eee6] text-[13px] font-medium text-[#a79a90]"
      >
        Apple sign-in coming soon
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!scriptReady || isSigningIn}
        className="flex h-[52px] w-full max-w-[300px] items-center justify-center gap-2 rounded-[24px] bg-black text-[14px] font-medium text-white transition hover:bg-[#1a1a1a] disabled:opacity-60"
      >
        <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.5 46.4 174.9 46.4 42.7 0 109.2-49 190.5-49 30.4 0 108.2 2.6 168.6 79.3-4.2 2.6-14.1 8.4-14.1 8.4zM590 0c14 95.5-80.2 190.2-165.1 186.2C412.2 94.8 500.4 5.3 590 0z" />
        </svg>
        Continue with Apple
      </button>
    </>
  );
}
