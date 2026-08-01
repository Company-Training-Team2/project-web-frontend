import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout showBack backHref="/login">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
