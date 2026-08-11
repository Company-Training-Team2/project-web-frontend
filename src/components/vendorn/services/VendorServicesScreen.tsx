"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { VendorWorkPost, vendorPortalService, getVendorPortalErrorMessage } from "@/services/vendorPortal.service";
import ServicesTopBar from "./ServicesTopBar";
import ServicesHeader from "./ServicesHeader";
import ServiceStatsCards from "./ServiceStatsCards";
import ServiceFilters, { ServiceFiltersState } from "./ServiceFilters";
import ServiceGrid from "./ServiceGrid";
import ServicesFooter from "./ServicesFooter";

export default function VendorServicesScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const [services, setServices] = useState<VendorWorkPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFiltersState>({
    search: "",
    category: null,
    status: null,
    view: "grid",
  });

  const load = () => {
    setError(null);
    vendorPortalService
      .getServices()
      .then(setServices)
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load your services.")));
  };

  useEffect(() => {
    if (!isVendor) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isVendor]);

  const categories = useMemo(
    () => Array.from(new Set((services ?? []).map((s) => s.categoryName))).sort(),
    [services]
  );

  const filtered = useMemo(() => {
    if (!services) return [];
    return services.filter((s) => {
      if (filters.search && !s.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category && s.categoryName !== filters.category) return false;
      if (filters.status && s.approvalStatus !== filters.status) return false;
      return true;
    });
  }, [services, filters]);

  if (authLoading || !isVendor) return null;

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#EDE0D2]">
      <VendorSidebar />

      <main className="min-w-0 flex-1 p-3 pb-24 md:p-6 md:pb-8">
        <ServicesTopBar />
        <ServicesHeader />

        {error ? (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : !services ? (
          <div className="flex items-center justify-center gap-2 py-24 text-[#8B7E72]">
            <Loader2 className="size-5 animate-spin" />
            Loading services…
          </div>
        ) : (
          <>
            <ServiceStatsCards services={services} />
            <ServiceFilters categories={categories} filters={filters} onChange={setFilters} />
            {filtered.length === 0 ? (
              <div className="mt-6 rounded-[16px] border border-dashed border-[#DCCFC0] py-16 text-center text-sm text-[#8B7E72]">
                {services.length === 0
                  ? "You haven't listed any services yet."
                  : "No services match these filters."}
              </div>
            ) : (
              <ServiceGrid services={filtered} view={filters.view} />
            )}
            <ServicesFooter />
          </>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
