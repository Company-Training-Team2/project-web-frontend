"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import VendorHeroCarousel from "./VendorHeroCarousel";
import VendorHeaderInfo from "./VendorHeaderInfo";
import VendorDescription from "./VendorDescription";
import NextOpenDates from "./NextOpenDates";
import PackageTiers from "./PackageTiers";
import VendorReviews from "./VendorReviews";
import StickyBookBar from "./StickyBookBar";
import LoadingScreen from "@/components/shared/LoadingScreen";
import SampleDataNotice from "@/components/shared/SampleDataNotice";
import { MockPackage, MockReview, MockVendor } from "@/lib/mock/types";
import { getVendorDetail } from "@/services/vendor.service";

export default function VendorDetailsScreen({ vendorId }: { vendorId: string }) {
  // Real WorkPostController.GetById is public and live — queried for real,
  // falling back to the fixture lookup if unreachable or the id doesn't
  // resolve there (see getVendorDetail in vendor.service.ts).
  const [vendor, setVendor] = useState<MockVendor | null | undefined>(undefined);
  const [packages, setPackages] = useState<MockPackage[]>([]);
  const [reviews, setReviews] = useState<MockReview[]>([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getVendorDetail(vendorId).then((result) => {
      if (cancelled) return;
      setVendor(result?.vendor ?? null);
      setPackages(result?.packages ?? []);
      setReviews(result?.reviews ?? []);
      setSelectedPackageId(result?.packages[0]?.id ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [vendorId]);

  if (vendor === undefined) {
    return <LoadingScreen fullScreen={false} />;
  }

  if (vendor === null) {
    notFound();
  }

  const selectedPackage = packages.find((p) => p.id === selectedPackageId) ?? packages[0];

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl bg-[#faf6f0] pb-4 lg:max-w-4xl">
      <VendorHeroCarousel vendor={vendor} />
      {!/^\d+$/.test(vendor.id) ? <SampleDataNotice className="px-4 pt-3 sm:px-6" /> : null}
      <VendorHeaderInfo vendor={vendor} />
      <VendorDescription description={vendor.description} />
      <NextOpenDates selected={selectedDate} onSelect={setSelectedDate} />
      {packages.length > 0 ? (
        <PackageTiers packages={packages} selectedId={selectedPackageId} onSelect={setSelectedPackageId} />
      ) : null}
      {reviews.length > 0 ? <VendorReviews reviews={reviews} total={vendor.reviewCount} /> : null}
      <StickyBookBar
        vendorId={vendor.id}
        packageId={selectedPackageId}
        price={selectedPackage?.price ?? vendor.price}
      />
    </div>
  );
}
