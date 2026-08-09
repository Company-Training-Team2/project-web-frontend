"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";

import { GOOGLE_CLIENT_ID } from "@/config/env";
import { useAuth } from "@/context/AuthContext";
import { getAuthErrorMessage } from "@/services/auth.service";

// Google Identity Services isn't in the DOM lib's type defs — declared just
// enough of its shape to call it, not the whole SDK surface.
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

/** Renders Google's own "Sign in with Google" button (via Identity
 * Services' renderButton) rather than a custom-styled one that fakes the
 * flow — Google requires using their button/prompt for this credential
 * flow, and hand-rolling a look-alike that opens a popup yourself doesn't
 * reliably get a usable id_token back the way this does. */
export default function GoogleSignInButton({ redirectTo }: { redirectTo?: string }) {
  const { loginWithGoogle } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !GOOGLE_CLIENT_ID || !buttonRef.current || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          await loginWithGoogle(response.credential, redirectTo);
        } catch (error) {
          toast.error(getAuthErrorMessage(error, "Google sign-in failed. Try again."));
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      logo_alignment: "left",
      width: 300,
    });
    // loginWithGoogle/redirectTo are read fresh inside the callback closure
    // above each render, but re-initializing on every render would fight
    // Google's own button lifecycle — only re-run when the script/DOM node
    // actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptReady]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        disabled
        title="Google sign-in isn't configured yet"
        className="h-[52px] w-full max-w-[300px] rounded-[24px] border border-[#d7cab9] bg-[#f5eee6] text-[13px] font-medium text-[#a79a90]"
      >
        Google sign-in coming soon
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={buttonRef} className="flex justify-center" />
    </>
  );
}
