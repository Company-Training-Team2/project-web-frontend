import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterOption from "@/components/auth/RegisterOption";

export const metadata: Metadata = {
  title: "Join EventHub",
};

export default function RegisterOptionPage() {
  return (
    <AuthLayout showBack backHref="/login">
      <RegisterOption />
    </AuthLayout>
  );
}
