import { Suspense } from "react";
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import OTPForm from "@/components/auth/OTPForm";
import LoadingScreen from "@/components/shared/LoadingScreen";

export const metadata: Metadata = {
  title: "Verify Code - EventHub",
};

interface OTPPageProps {
  searchParams: Promise<{ purpose?: string }>;
}

export default async function OTPPage({ searchParams }: OTPPageProps) {
  // This one /otp route serves two different flows (OTPForm.tsx:34 defaults
  // to "reset-password" unless purpose=register), but the back button used to
  // hardcode /forgot-password regardless — so verifying a brand-new
  // registration's email and tapping Back would drop the user into the
  // Forgot Password flow instead of back to Registration.
  const { purpose } = await searchParams;
  const backHref = purpose === "register" ? "/register" : "/forgot-password";

  return (
    <AuthLayout showBack backHref={backHref} className="bg-[#fffdfb]">
      <Suspense fallback={<LoadingScreen fullScreen={false} />}>
        <OTPForm />
      </Suspense>
    </AuthLayout>
  );
}
