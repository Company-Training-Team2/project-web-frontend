import { Suspense } from "react";
import CheckoutScreen from "@/components/booking/CheckoutScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <CheckoutScreen />
    </Suspense>
  );
}
