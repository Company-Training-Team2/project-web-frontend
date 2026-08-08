import VendorSidebar from "@/components/layout/VendorSidebar";
import EditTopBar from "@/components/vendorn/services/edit/EditTopBar";
import BasicInfoCard from "@/components/vendorn/services/edit/BasicInfoCard";
import PreviewCard from "@/components/vendorn/services/edit/PreviewCard";
import MediaGalleryCard from "@/components/vendorn/services/edit/MediaGalleryCard";
import PricingLogisticsCard from "@/components/vendorn/services/edit/PricingLogisticsCard";
import AmenitiesCard from "@/components/vendorn/services/edit/AmenitiesCard";
import PoliciesCard from "@/components/vendorn/services/edit/PoliciesCard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewServicePage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <EditTopBar />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
          <div>
            <Link
              href="/vendor/services"
              className="flex items-center gap-1 text-xs text-[#8B716A] hover:text-[#2B2622] mb-2"
            >
              <ChevronLeft size={14} />
              Back to Services
            </Link>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#A3391C]">
              Create New Service
            </h1>
          </div>

          <span className="text-xs font-medium bg-[#8B716A] text-white px-3 py-1.5 rounded-full w-fit">
            Draft
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
            <BasicInfoCard />
            <MediaGalleryCard />
            <PricingLogisticsCard />
            <AmenitiesCard />
            <PoliciesCard />
          </div>

          <div className="flex flex-col gap-6 min-w-0">
            <PreviewCard />
          </div>
        </div>
      </main>
    </div>
  );
}