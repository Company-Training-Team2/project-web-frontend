"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { VendorAnalytics, vendorPortalService, getVendorPortalErrorMessage } from "@/services/vendorPortal.service";
import AnalyticsTopBar from "./AnalyticsTopBar";
import StatsCards from "./StatsCards";
import RevenueGrowthChart from "./RevenueGrowthChart";
import PerformanceIntelligence from "./PerformanceIntelligence";
import HighPerformingPackages from "./HighPerformingPackages";

export default function VendorAnalyticsScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const [analytics, setAnalytics] = useState<VendorAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    vendorPortalService
      .getAnalytics()
      .then(setAnalytics)
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load analytics.")));
  };

  useEffect(() => {
    if (!isVendor) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isVendor]);

  if (authLoading || !isVendor) return null;

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#EDE0D2]">
      <VendorSidebar />

      <main className="min-w-0 flex-1 p-3 pb-24 md:p-6 md:pb-8">
        <AnalyticsTopBar />

        {error ? (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : !analytics ? (
          <div className="flex items-center justify-center gap-2 py-24 text-[#8B7E72]">
            <Loader2 className="size-5 animate-spin" />
            Loading analytics…
          </div>
        ) : (
          <>
            <StatsCards analytics={analytics} />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="min-w-0 lg:col-span-2">
                <RevenueGrowthChart monthlyRevenue={analytics.monthlyRevenue} />
              </div>
              <div className="min-w-0">
                <PerformanceIntelligence performance={analytics.workPostPerformance} />
              </div>
            </div>

            <div className="mt-6">
              <HighPerformingPackages performance={analytics.workPostPerformance} />
            </div>
          </>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
