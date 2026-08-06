"use client";

import { useState } from "react";
import { notFound } from "next/navigation";

import VendorHeroCarousel from "./VendorHeroCarousel";
import VendorHeaderInfo from "./VendorHeaderInfo";
import VendorDescription from "./VendorDescription";
import NextOpenDates from "./NextOpenDates";
import PackageTiers from "./PackageTiers";
import VendorReviews from "./VendorReviews";
import StickyBookBar from "./StickyBookBar";
import { getPackagesForVendor, getReviewsForVendor, getVendorById } from "@/lib/mock/vendors";

export default function VendorDetailsScreen({ vendorId }: { vendorId: string }) {
  const vendor = getVendorById(vendorId);
  const packages = getPackagesForVendor(vendorId);
  const reviews = getReviewsForVendor(vendorId);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(packages[0]?.id ?? null);

  if (!vendor) {
    notFound();
  }

  const selectedPackage = packages.find((p) => p.id === selectedPackageId) ?? packages[0];

  return (
    <div className="mx-auto min-h-screen w-full max-w-2xl bg-[#faf6f0] pb-4 lg:max-w-4xl">
      <VendorHeroCarousel vendor={vendor} />
      <VendorHeaderInfo vendor={vendor} />
      <VendorDescription description={vendor.description} />
      <NextOpenDates selected={selectedDate} onSelect={setSelectedDate} />
      <PackageTiers packages={packages} selectedId={selectedPackageId} onSelect={setSelectedPackageId} />
      <VendorReviews reviews={reviews} total={vendor.reviewCount} />
      <StickyBookBar
        vendorId={vendor.id}
        packageId={selectedPackageId}
        pricePerGuest={selectedPackage?.pricePerGuest ?? vendor.price}
      />
    </div>
  );
}
