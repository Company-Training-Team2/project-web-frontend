import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <AuthLayout showHeader={false} showStatusBar>
      <LoginForm />
    </AuthLayout>
  );
}
