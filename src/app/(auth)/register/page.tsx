import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout showBack backHref="/login">
      <RegisterForm />
    </AuthLayout>
  );
}
