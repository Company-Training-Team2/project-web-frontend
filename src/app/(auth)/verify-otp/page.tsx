import AuthLayout from "@/components/auth/AuthLayout";
import OTPForm from "@/components/auth/OTPForm";

export default function VerifyOTPPage() {
  return (
    <AuthLayout showBack backHref="/forgot-password">
      <OTPForm />
    </AuthLayout>
  );
}
