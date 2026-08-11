"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { VendorWorkPost } from "@/services/vendorPortal.service";

const statusStyles: Record<string, string> = {
  Approved: "bg-[#1F7A4D] text-white",
  Pending: "bg-[#B08D3E] text-white",
  Rejected: "bg-[#A3391C] text-white",
};

const statusLabel: Record<string, string> = {
  Approved: "Active",
  Pending: "Pending Review",
  Rejected: "Rejected",
};

export default function ServiceGrid({
  services,
  view,
}: {
  services: VendorWorkPost[];
  view: "grid" | "list";
}) {
  return (
    <div
      className={
        view === "grid"
          ? "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          : "mt-6 flex flex-col gap-3"
      }
    >
      {services.map((s) => {
        const primaryImage = s.images.find((i) => i.isPrimary) ?? s.images[0];

        if (view === "list") {
          return (
            <Link
              key={s.id}
              href={`/vendor/services/${s.id}/edit`}
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-3 transition hover:shadow-md"
            >
              <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-[#DCCFC0]">
                {primaryImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded images are arbitrary URLs
                  <img src={primaryImage.imageUrl} alt={s.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wide text-[#8B7E72]">{s.categoryName}</p>
                <h3 className="truncate font-serif font-semibold text-[#2B2622]">{s.title}</h3>
                <p className="text-xs text-[#8B7E72]">EGP {s.price.toLocaleString()} · {s.totalBookings} bookings</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  statusStyles[s.approvalStatus] ?? "bg-[#8B716A] text-white"
                }`}
              >
                {statusLabel[s.approvalStatus] ?? s.approvalStatus}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={s.id}
            href={`/vendor/services/${s.id}/edit`}
            className="overflow-hidden rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] transition hover:shadow-md"
          >
            <div className="relative h-40 bg-[#DCCFC0]">
              {primaryImage ? (
                // eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded images are arbitrary URLs
                <img src={primaryImage.imageUrl} alt={s.title} className="h-full w-full object-cover" />
              ) : null}
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  statusStyles[s.approvalStatus] ?? "bg-[#8B716A] text-white"
                }`}
              >
                {statusLabel[s.approvalStatus] ?? s.approvalStatus}
              </span>

              {s.averageRating > 0 && (
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[#2B2622]">
                  <Star size={11} className="fill-[#B08D3E] text-[#B08D3E]" />
                  {s.averageRating.toFixed(1)} ({s.reviewCount})
                </span>
              )}
            </div>

            <div className="p-4">
              <p className="text-[10px] uppercase tracking-wide text-[#8B7E72]">{s.categoryName}</p>
              <h3 className="mt-1 font-serif font-semibold text-[#2B2622]">{s.title}</h3>

              <div className="mt-4 flex items-center justify-between border-t border-[#DCCFC0] pt-3">
                <div>
                  <p className="text-[10px] text-[#8B7E72]">STARTING AT</p>
                  <p className="text-sm font-semibold text-[#A3391C]">EGP {s.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#8B7E72]">BOOKINGS</p>
                  <p className="text-sm font-medium text-[#2B2622]">{s.totalBookings}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      <Link
        href="/vendor/services/new"
        className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-[16px] border-2 border-dashed border-[#DCCFC0] text-[#8B716A] transition hover:bg-[#F6ECE0]"
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-[#A3391C] text-white">
          <Plus size={20} />
        </div>
        <span className="text-sm font-semibold text-[#2B2622]">Create New Service</span>
        <span className="max-w-[180px] text-center text-xs">
          Add a new offering to your vendor portfolio.
        </span>
      </Link>
    </div>
  );
}
