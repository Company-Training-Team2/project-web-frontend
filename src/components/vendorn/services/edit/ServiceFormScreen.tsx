"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import {
  vendorPortalService,
  getVendorPortalErrorMessage,
  VendorWorkPost,
  CreateWorkPostPayload,
} from "@/services/vendorPortal.service";
import { categoriesService, Category } from "@/services/categories.service";

import EditTopBar from "./EditTopBar";
import EditHeader from "./EditHeader";
import BasicInfoCard, { BasicInfoValue } from "./BasicInfoCard";
import MediaGalleryCard, { GalleryImage } from "./MediaGalleryCard";
import PricingLogisticsCard, { PackageDraft } from "./PricingLogisticsCard";
import AmenitiesCard from "./AmenitiesCard";
import PoliciesCard from "./PoliciesCard";
import PreviewCard from "./PreviewCard";
import SeoPreviewCard from "./SeoPreviewCard";

const emptyBasicInfo: BasicInfoValue = {
  title: "",
  categoryId: "",
  description: "",
  city: "",
  address: "",
};

export default function ServiceFormScreen({ serviceId }: { serviceId?: number }) {
  const mode: "create" | "edit" = serviceId ? "edit" : "create";
  const router = useRouter();
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [loadingService, setLoadingService] = useState(mode === "edit");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [service, setService] = useState<VendorWorkPost | null>(null);

  const [basicInfo, setBasicInfo] = useState<BasicInfoValue>(emptyBasicInfo);
  const [price, setPrice] = useState("");
  const [minGuests, setMinGuests] = useState(""); // local-only, see PricingLogisticsCard
  const [maxGuests, setMaxGuests] = useState(""); // local-only, see PricingLogisticsCard
  const [packages, setPackages] = useState<PackageDraft[]>([]);

  const [existingImages, setExistingImages] = useState<GalleryImage[]>([]);
  const [stagedFiles, setStagedFiles] = useState<{ key: string; file: File; url: string }[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Field-level red borders/messages only appear after a first failed
  // submit attempt — not on initial render, which would just look broken.
  const [showErrors, setShowErrors] = useState(false);

  // Load categories (real GET /api/categories)
  useEffect(() => {
    categoriesService
      .getAll()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setCategoriesLoading(false));
  }, []);

  // Load existing service in edit mode
  useEffect(() => {
    if (mode !== "edit" || !serviceId || !isVendor) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingService(true);
    setLoadError(null);
    vendorPortalService
      .getService(serviceId)
      .then((data) => {
        setService(data);
        setBasicInfo({
          title: data.title,
          categoryId: "", // resolved once categories load, see effect below
          description: data.description,
          city: data.city,
          address: data.address,
        });
        setPrice(String(data.price));
        setExistingImages(
          data.images.map((img) => ({
            key: `existing-${img.id}`,
            url: img.imageUrl,
            isPrimary: img.isPrimary,
          }))
        );
      })
      .catch((err) => setLoadError(getVendorPortalErrorMessage(err, "Couldn't load this service.")))
      .finally(() => setLoadingService(false));
  }, [mode, serviceId, isVendor]);

  // Once both the service and the category list are loaded, resolve the
  // service's categoryName (that's all VendorWorkPost exposes) back to a
  // real categoryId by matching against the unique Category.Name.
  useEffect(() => {
    if (!service || categories.length === 0) return;
    const match = categories.find((c) => c.name === service.categoryName);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (match) setBasicInfo((prev) => ({ ...prev, categoryId: match.id }));
  }, [service, categories]);

  // Release staged object URLs on unmount
  useEffect(() => {
    return () => {
      stagedFiles.forEach((f) => URL.revokeObjectURL(f.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images: GalleryImage[] = useMemo(
    () => [
      ...existingImages,
      ...stagedFiles.map((f) => ({ key: f.key, url: f.url, isStaged: true })),
    ],
    [existingImages, stagedFiles]
  );

  const handleAddFiles = async (files: FileList) => {
    const fileArray = Array.from(files);

    if (mode === "create") {
      setStagedFiles((prev) => [
        ...prev,
        ...fileArray.map((file) => ({
          key: `staged-${Date.now()}-${file.name}`,
          file,
          url: URL.createObjectURL(file),
        })),
      ]);
      return;
    }

    if (!serviceId) return;
    setUploadingImages(true);
    setSubmitError(null);
    try {
      const updated = await vendorPortalService.uploadServiceImages(serviceId, fileArray);
      setService(updated);
      setExistingImages(
        updated.images.map((img) => ({
          key: `existing-${img.id}`,
          url: img.imageUrl,
          isPrimary: img.isPrimary,
        }))
      );
    } catch (err) {
      setSubmitError(getVendorPortalErrorMessage(err, "Couldn't upload those images."));
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveStaged = (key: string) => {
    setStagedFiles((prev) => {
      const target = prev.find((f) => f.key === key);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.key !== key);
    });
  };

  const guestsRangeValid =
    minGuests.trim() === "" || maxGuests.trim() === "" || Number(minGuests) <= Number(maxGuests);

  const isValid = Boolean(
    basicInfo.title.trim() &&
      basicInfo.categoryId !== "" &&
      basicInfo.description.trim() &&
      basicInfo.city.trim() &&
      basicInfo.address.trim() &&
      Number(price) > 0 &&
      guestsRangeValid
  );

  const handleSubmit = async () => {
    if (!isValid) {
      setShowErrors(true);
      setSubmitError("Fix the highlighted fields below before submitting.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (mode === "create") {
        const payload: CreateWorkPostPayload = {
          categoryId: Number(basicInfo.categoryId),
          title: basicInfo.title.trim(),
          description: basicInfo.description.trim(),
          price: Number(price),
          city: basicInfo.city.trim(),
          address: basicInfo.address.trim(),
          servicePackages: packages
            .filter((p) => p.name.trim() && Number(p.price) > 0)
            .map((p) => ({
              name: p.name.trim(),
              price: Number(p.price),
              includes: p.includes.trim() || undefined,
            })),
        };
        const created = await vendorPortalService.createService(payload);

        if (stagedFiles.length > 0) {
          await vendorPortalService.uploadServiceImages(created.id, stagedFiles.map((f) => f.file));
        }

        router.push("/vendor/services");
      } else if (serviceId) {
        await vendorPortalService.updateService(serviceId, {
          categoryId: Number(basicInfo.categoryId),
          title: basicInfo.title.trim(),
          description: basicInfo.description.trim(),
          price: Number(price),
          city: basicInfo.city.trim(),
          address: basicInfo.address.trim(),
        });
        router.push("/vendor/services");
      }
    } catch (err) {
      setSubmitError(getVendorPortalErrorMessage(err, "Couldn't save this service."));
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !isVendor) return null;

  if (loadingService) {
    return (
      <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
        <VendorSidebar />
        <main className="flex-1 flex items-center justify-center gap-2 text-[#8B7E72] p-6">
          <Loader2 className="size-5 animate-spin" />
          Loading service…
        </main>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
        <VendorSidebar />
        <main className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-[#A3391C]">{loadError}</p>
        </main>
      </div>
    );
  }

  const primaryImage = images.find((i) => i.isPrimary) ?? images[0];

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <EditTopBar />
        <EditHeader
          name={mode === "create" ? "Create New Service" : basicInfo.title}
          status={mode === "create" ? "Draft" : service?.approvalStatus}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
            <BasicInfoCard
              value={basicInfo}
              onChange={(patch) => setBasicInfo((prev) => ({ ...prev, ...patch }))}
              categories={categories}
              categoriesLoading={categoriesLoading}
              showErrors={showErrors}
            />
            <MediaGalleryCard
              images={images}
              onAddFiles={handleAddFiles}
              onRemoveStaged={handleRemoveStaged}
              uploading={uploadingImages}
            />
            <PricingLogisticsCard
              mode={mode}
              price={price}
              onPriceChange={setPrice}
              packages={packages}
              onPackagesChange={setPackages}
              existingPackages={service?.servicePackages}
              minGuests={minGuests}
              onMinGuestsChange={setMinGuests}
              maxGuests={maxGuests}
              onMaxGuestsChange={setMaxGuests}
              showErrors={showErrors}
            />
            <AmenitiesCard />
            <PoliciesCard />
          </div>

          <div className="flex flex-col gap-6 min-w-0">
            <PreviewCard
              title={basicInfo.title}
              price={price}
              imageUrl={primaryImage?.url}
              mode={mode}
              submitting={submitting}
              onSubmit={handleSubmit}
              error={submitError}
              isFormInvalid={showErrors && !isValid}
            />
            <SeoPreviewCard
              title={basicInfo.title}
              description={basicInfo.description}
              city={basicInfo.city}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
