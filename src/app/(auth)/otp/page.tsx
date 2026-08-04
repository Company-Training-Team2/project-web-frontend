import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import OTPForm from "@/components/auth/OTPForm";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function OTPPage() {
  return (
    <AuthLayout showBack backHref="/forgot-password" className="bg-[#fffdfb]">
      <Suspense fallback={<LoadingScreen fullScreen={false} />}>
        <OTPForm />
      </Suspense>
    </AuthLayout>
  );
}
