import Link from "next/link";
import { VendorWorkPost } from "@/services/vendorPortal.service";

const statusLabel: Record<string, string> = {
  Approved: "Live",
  Pending: "Pending Review",
  Rejected: "Rejected",
};

export default function ProfilePackages({ services }: { services: VendorWorkPost[] }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622]">
          Packages &amp; Services
        </h2>
        <Link href="/vendor/services/new" className="text-xs font-medium text-[#A3391C]">
          + Add Service
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="text-sm text-[#8B7E72]">You haven&apos;t listed any services yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {services.map((s) => {
            const primaryImage = s.images.find((i) => i.isPrimary) ?? s.images[0];
            return (
              <div
                key={s.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-[#DCCFC0] bg-white p-3"
              >
                <div className="h-20 sm:w-28 sm:h-20 rounded-lg bg-[#DCCFC0] overflow-hidden shrink-0">
                  {primaryImage && (
                    // eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded image is an arbitrary URL
                    <img src={primaryImage.imageUrl} alt="" className="h-full w-full object-cover" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#2B2622] truncate">{s.title}</p>
                  <p className="text-xs text-[#8B7E72] line-clamp-2 mt-0.5">{s.description}</p>
                  <p className="text-sm font-bold text-[#A3391C] mt-1">
                    From EGP {s.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <span className="text-[10px] font-medium bg-[#EDE0D2] text-[#8B716A] px-2 py-1 rounded-full whitespace-nowrap">
                    {statusLabel[s.approvalStatus] ?? s.approvalStatus}
                  </span>
                  <Link
                    href={`/vendor/services/${s.id}/edit`}
                    className="text-xs font-medium bg-[#A3391C] text-white rounded-lg px-3 py-1.5 hover:opacity-90 whitespace-nowrap"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
