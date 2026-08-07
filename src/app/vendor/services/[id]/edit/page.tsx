import VendorSidebar from "@/components/layout/VendorSidebar";
import EditTopBar from "@/components/vendorn/services/edit/EditTopBar";
import EditHeader from "@/components/vendorn/services/edit/EditHeader";
import BasicInfoCard from "@/components/vendorn/services/edit/BasicInfoCard";
import PreviewCard from "@/components/vendorn/services/edit/PreviewCard";
import MediaGalleryCard from "@/components/vendorn/services/edit/MediaGalleryCard";
import PricingLogisticsCard from "@/components/vendorn/services/edit/PricingLogisticsCard";
import AmenitiesCard from "@/components/vendorn/services/edit/AmenitiesCard";
import PoliciesCard from "@/components/vendorn/services/edit/PoliciesCard";
import SeoPreviewCard from "@/components/vendorn/services/edit/SeoPreviewCard";

export default function EditServicePage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <EditTopBar />
        <EditHeader name="Signature Heritage Banquet" />

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
            <SeoPreviewCard />
          </div>
        </div>
      </main>
    </div>
  );
}