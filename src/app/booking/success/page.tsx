import { Suspense } from "react";
import PaymentSuccessScreen from "@/components/booking/PaymentSuccessScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <PaymentSuccessScreen />
    </Suspense>
  );
}
