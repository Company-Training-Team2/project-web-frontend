import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In - EventHub",
};

export default function LoginPage() {
  return (
    <AuthLayout showHeader={false}>
      <LoginForm />
    </AuthLayout>
  );
}
