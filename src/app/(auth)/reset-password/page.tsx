import { Suspense } from "react";
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import LoadingScreen from "@/components/shared/LoadingScreen";

export const metadata: Metadata = {
  title: "Set New Password - EventHub",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout showBack backHref="/forgot-password">
      <Suspense fallback={<LoadingScreen fullScreen={false} />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
