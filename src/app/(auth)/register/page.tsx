import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterRouter from "@/components/auth/RegisterRouter";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function RegisterPage() {
  return (
    <AuthLayout showBack backHref="/register-option">
      <Suspense fallback={<LoadingScreen fullScreen={false} />}>
        <RegisterRouter />
      </Suspense>
    </AuthLayout>
  );
}
