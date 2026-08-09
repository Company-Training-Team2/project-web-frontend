"use client";

import { useIsApplePlatform } from "@/hooks/useIsApplePlatform";
import AppleSignInButton from "./AppleSignInButton";
import GoogleSignInButton from "./GoogleSignInButton";
import Divider from "./Divider";

/** Shows exactly one social sign-in option, chosen by platform: Apple on
 * Mac/iPhone/iPad, Google everywhere else — never both at once. `null`
 * (device not determined yet, first paint) renders neither button rather
 * than guessing, so there's no flash of the wrong provider. */
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

      <div className="flex justify-center">
        {isApple === null ? (
          <div className="h-[52px] w-full max-w-[300px]" />
        ) : isApple ? (
          <AppleSignInButton redirectTo={redirectTo} />
        ) : (
          <GoogleSignInButton redirectTo={redirectTo} />
        )}
      </div>
    </div>
  );
}
