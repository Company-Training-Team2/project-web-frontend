import VendorSidebar from "@/components/layout/VendorSidebar";
import ServicesTopBar from "@/components/vendorn/services/ServicesTopBar";
import ServicesHeader from "@/components/vendorn/services/ServicesHeader";
import ServiceFilters from "@/components/vendorn/services/ServiceFilters";
import ServiceGrid from "@/components/vendorn/services/ServiceGrid";

export default function VendorServicesPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <ServicesTopBar />
        <ServicesHeader />
        <ServiceFilters />
        <ServiceGrid />
      </main>
    </div>
  );
}