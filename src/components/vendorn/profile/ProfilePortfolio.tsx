import Link from "next/link";
import { VendorWorkPost } from "@/services/vendorPortal.service";

// Prefers the vendor's real portfolio gallery (VendorPortfolioImage, added
// at registration) when they have one. Older accounts registered before
// that existed have none, so this falls back to the same honest
// workaround as before — every image already uploaded across their listed
// services — rather than showing an empty section.
export default function ProfilePortfolio({
  services,
  portfolioImageUrls = [],
}: {
  services: VendorWorkPost[];
  portfolioImageUrls?: string[];
}) {
  const images =
    portfolioImageUrls.length > 0
      ? portfolioImageUrls.map((url, i) => ({ key: `portfolio-${i}`, url, serviceId: null as number | null }))
      : services.flatMap((s) =>
          s.images.map((img) => ({ key: `${s.id}-${img.id}`, url: img.imageUrl, serviceId: s.id as number | null }))
        );

  if (images.length === 0) return null;

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622]">Visual Portfolio</h2>
        <Link href="/vendor/services" className="text-xs font-medium text-[#A3391C]">
          View Full Gallery →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, 6).map((img) =>
          img.serviceId !== null ? (
            <Link
              key={img.key}
              href={`/vendor/services/${img.serviceId}/edit`}
              className="aspect-square overflow-hidden rounded-xl bg-[#DCCFC0]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded image is an arbitrary URL */}
              <img src={img.url} alt="" className="h-full w-full object-cover hover:opacity-90 transition" />
            </Link>
          ) : (
            // Real portfolio photos aren't tied to any one service listing,
            // so there's nowhere specific to link them to yet.
            <div key={img.key} className="aspect-square overflow-hidden rounded-xl bg-[#DCCFC0]">
              {/* eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded image is an arbitrary URL */}
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </div>
          )
        )}
      </div>
    </div>
  );
}
