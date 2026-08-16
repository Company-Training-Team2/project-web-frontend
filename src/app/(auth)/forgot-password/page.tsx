import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ForgotPasswordDesktop from "@/components/auth/ForgotPasswordDesktop";

export const metadata: Metadata = {
  title: "Forgot Password - EventHub",
};

// This screen's Desktop Figma frame is a bespoke full-bleed layout, not the
// shared AuthLayout sidebar treatment every other auth page uses. Rather
// than special-case AuthLayout itself, render two breakpoint-gated trees
// here: the existing shared shell for <lg, and the bespoke design for lg+.
export default function ForgotPasswordPage() {
  return (
    <>
      <div className="lg:hidden">
        <AuthLayout showBack backHref="/login">
          <ForgotPasswordForm />
        </AuthLayout>
      </div>
      <div className="hidden lg:block">
        <ForgotPasswordDesktop />
      </div>
    </>
  );
}
