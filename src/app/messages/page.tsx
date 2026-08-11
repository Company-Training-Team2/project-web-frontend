import { Suspense } from "react";
import MessagesScreen from "@/components/messages/MessagesScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function MessagesPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <MessagesScreen />
    </Suspense>
  );
}
