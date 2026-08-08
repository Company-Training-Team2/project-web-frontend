"use client";

import Link from "next/link";
import { Star, Plus } from "lucide-react";

type ServiceStatus = "Active" | "Draft";

type Service = {
  id: string;
  name: string;
  category: string;
  status: ServiceStatus;
  rating?: string;
  reviews?: number;
  priceLabel: string;
  price: string;
  metaLabel: string;
  metaValue: string;
};

const services: Service[] = [
  {
    id: "the-grand-ballroom",
    name: "The Grand Ballroom",
    category: "WEDDING VENUE",
    status: "Active",
    rating: "5.0",
    reviews: 128,
    priceLabel: "STARTING AT",
    price: "EGP 45,000",
    metaLabel: "UPCOMING",
    metaValue: "12 Bookings",
  },
  {
    id: "savore-signature-catering",
    name: "Savoré Signature Catering",
    category: "CATERING",
    status: "Active",
    rating: "4.9",
    reviews: 86,
    priceLabel: "STARTING AT",
    price: "EGP 1,200/guest",
    metaLabel: "UPCOMING",
    metaValue: "5 Bookings",
  },
  {
    id: "atelier-fleur-heritage",
    name: "Atelier Fleur - Heritage",
    category: "FLORIST",
    status: "Draft",
    priceLabel: "PROPOSED PRICE",
    price: "EGP 8,500",
    metaLabel: "COMPLETION",
    metaValue: "85%",
  },
];

const statusStyles: Record<ServiceStatus, string> = {
  Active: "bg-[#1F7A4D] text-white",
  Draft: "bg-[#8B716A] text-white",
};

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {services.map((s) => (
        <Link
          key={s.id}
          href={`/vendor/services/${s.id}/edit`}
          className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden hover:shadow-md transition"
        >
          <div className="relative h-40 bg-[#DCCFC0]">
            <span
              className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[s.status]}`}
            >
              {s.status}
            </span>

            {s.rating && (
              <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold bg-white/90 text-[#2B2622] px-2 py-1 rounded-full">
                <Star size={11} className="fill-[#B08D3E] text-[#B08D3E]" />
                {s.rating} ({s.reviews})
              </span>
            )}
          </div>

          <div className="p-4">
            <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">
              {s.category}
            </p>
            <h3 className="font-serif font-semibold text-[#2B2622] mt-1">
              {s.name}
            </h3>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#DCCFC0]">
              <div>
                <p className="text-[10px] text-[#8B7E72]">{s.priceLabel}</p>
                <p className="font-semibold text-sm text-[#A3391C]">
                  {s.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#8B7E72]">{s.metaLabel}</p>
                <p className="font-medium text-sm text-[#2B2622]">
                  {s.metaValue}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <Link
        href="/vendor/services/new"
        className="rounded-[16px] border-2 border-dashed border-[#DCCFC0] flex flex-col items-center justify-center gap-3 text-[#8B716A] hover:bg-[#F6ECE0] transition min-h-[260px]"
      >
        <div className="w-11 h-11 rounded-full bg-[#A3391C] flex items-center justify-center text-white">
          <Plus size={20} />
        </div>
        <span className="text-sm font-semibold text-[#2B2622]">
          Create New Service
        </span>
        <span className="text-xs text-center max-w-[180px]">
          Add a new offering to your vendor portfolio.
        </span>
      </Link>
    </div>
  );
}