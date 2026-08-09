"use client";

import { useIsApplePlatform } from "@/hooks/useIsApplePlatform";
import AppleSignInButton from "./AppleSignInButton";
import GoogleSignInButton from "./GoogleSignInButton";
import Divider from "./Divider";

/** Apple devices (Mac/iPhone/iPad) get both Apple and Google; everywhere
 * else it's Google only — Apple sign-in only really makes sense where an
 * Apple ID is already the native account. `null` (device not determined
 * yet, first paint) renders neither button rather than guessing, so
 * there's no flash of the wrong set. */
export default function SocialLogin({
  label = "OR CONTINUE WITH",
  redirectTo,
}: {
  label?: string;
  redirectTo?: string;
}) {
  const isApple = useIsApplePlatform();

  return (
    <div className="space-y-3">
      <Divider label={label} />

      <div className="flex flex-col items-center gap-3">
        {isApple === null ? (
          <div className="h-[52px] w-full max-w-[300px]" />
        ) : (
          <>
            {isApple && <AppleSignInButton redirectTo={redirectTo} />}
            <GoogleSignInButton redirectTo={redirectTo} />
          </>
        )}
      </div>
    </div>
  );
}
