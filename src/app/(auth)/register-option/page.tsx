import AuthLayout from "@/components/auth/AuthLayout";
import RegisterOption from "@/components/auth/RegisterOption";

export default function RegisterOptionPage() {
  return (
    <AuthLayout showBack backHref="/login">
      <RegisterOption />
    </AuthLayout>
  );
}
