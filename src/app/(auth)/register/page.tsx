import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterRouter from "@/components/auth/RegisterRouter";
import LoadingScreen from "@/components/shared/LoadingScreen";

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
