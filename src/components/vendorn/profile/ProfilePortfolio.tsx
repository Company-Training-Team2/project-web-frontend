import Link from "next/link";
import { VendorWorkPost } from "@/services/vendorPortal.service";

// Real photos pulled from the vendor's own services — there's no separate
// "portfolio" upload anywhere on the backend, so this is the honest
// equivalent: every image already uploaded across their listed services.
export default function ProfilePortfolio({ services }: { services: VendorWorkPost[] }) {
  const images = services.flatMap((s) =>
    s.images.map((img) => ({ key: `${s.id}-${img.id}`, url: img.imageUrl, serviceId: s.id }))
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
        {images.slice(0, 6).map((img) => (
          <Link
            key={img.key}
            href={`/vendor/services/${img.serviceId}/edit`}
            className="aspect-square overflow-hidden rounded-xl bg-[#DCCFC0]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded image is an arbitrary URL */}
            <img src={img.url} alt="" className="h-full w-full object-cover hover:opacity-90 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}
