"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { VendorDashboard, vendorPortalService, getVendorPortalErrorMessage } from "@/services/vendorPortal.service";
import DashboardTopBar from "./DashboardTopBar";
import GreetingHeader from "./GreetingHeader";
import QuickActions from "./QuickActions";
import UpcomingEngagements from "./UpcomingEngagements";
import AvailabilityMini from "./AvailabilityMini";
import RecentEnquiries from "./RecentEnquiries";
import TestimonialCard from "./TestimonialCard";

export default function VendorDashboardScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const [dashboard, setDashboard] = useState<VendorDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    vendorPortalService
      .getDashboard()
      .then(setDashboard)
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load your dashboard.")));
  };

  useEffect(() => {
    if (!isVendor) return;
    // One-time fetch on mount, gated on the auth check resolving — not
    // derived state, a real network call.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isVendor]);

  if (authLoading || !isVendor) return null;

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#EDE0D2]">
      <VendorSidebar />

      <main className="min-w-0 flex-1 p-3 pb-24 md:p-6 md:pb-8">
        <DashboardTopBar />

        {error ? (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : !dashboard ? (
          <div className="flex items-center justify-center gap-2 py-24 text-[#8B7E72]">
            <Loader2 className="size-5 animate-spin" />
            Loading dashboard…
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="min-w-0 lg:col-span-2">
              <GreetingHeader dashboard={dashboard} />
              <QuickActions />
              <UpcomingEngagements bookings={dashboard.upcomingBookings} />
            </div>

            <div className="flex min-w-0 flex-col gap-0">
              <AvailabilityMini />
              <RecentEnquiries bookings={dashboard.upcomingBookings} />
              <TestimonialCard dashboard={dashboard} />
            </div>
          </div>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
