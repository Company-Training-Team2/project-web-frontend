import { Suspense } from "react";
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterRouter from "@/components/auth/RegisterRouter";
import LoadingScreen from "@/components/shared/LoadingScreen";

export const metadata: Metadata = {
  title: "Create Account - EventHub",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const isVendor = role === "vendor";

  return (
    <AuthLayout showBack backHref="/register-option" wide={isVendor}>
      <Suspense fallback={<LoadingScreen fullScreen={false} />}>
        <RegisterRouter />
      </Suspense>
    </AuthLayout>
  );
}
