import { BadgeCheck, MapPin } from "lucide-react";
import { AdminPendingVendor } from "@/lib/mock/adminVendors";

export default function VendorApprovalHeader({ vendor }: { vendor: AdminPendingVendor }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="size-20 shrink-0 rounded-xl bg-[#DCCFC0]" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#f5e6c8] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#8a6b1f]">
            Awaiting Approval
          </span>
          <span className="flex items-center gap-1 text-[12px] text-[#8B716A]">
            <MapPin size={12} />
            {vendor.location}
          </span>
        </div>

        <h1 className="mt-1 font-serif text-[28px] font-bold leading-tight text-[#A3391C]">
          {vendor.businessName}
        </h1>
        <p className="text-[14px] text-[#8B716A]">{vendor.category}</p>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-[13px] text-[#2B2622]">
          <span>
            Owned by <span className="font-bold">{vendor.ownerName}</span>
          </span>
          {vendor.idVerified ? (
            <span className="flex items-center gap-1 font-medium text-[#2f7a4d]">
              <BadgeCheck size={14} />
              ID Verified
            </span>
          ) : null}
          {vendor.yearsInBusiness > 0 ? (
            <span className="text-[#8B716A]">{vendor.yearsInBusiness} Years in Business</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
