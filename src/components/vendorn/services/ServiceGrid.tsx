"use client";

import Link from "next/link";
import { MoreVertical, Plus } from "lucide-react";

type Service = {
  id: string;
  name: string;
  category: string;
  priceLabel: string;
  price: string;
  bookings: number;
  revenue: string;
  rating: string;
  reviews: number;
};

const services: Service[] = [
  {
    id: "signature-heritage-banquet",
    name: "Signature Heritage Banquet",
    category: "HERITAGE CATERING",
    priceLabel: "Starting Price",
    price: "From £32,900",
    bookings: 142,
    revenue: "8.4k",
    rating: "4.9",
    reviews: 142,
  },
  {
    id: "royal-orchid-centerpieces",
    name: "Royal Orchid Centerpieces",
    category: "FLORAL DESIGN",
    priceLabel: "Estimated Price",
    price: "£4,200",
    bookings: 0,
    revenue: "32",
    rating: "4.7",
    reviews: 32,
  },
  {
    id: "glass-pavilion-estate",
    name: "The Glass Pavilion Estate",
    category: "VENUE HIRE",
    priceLabel: "Base Rate",
    price: "From £26,000",
    bookings: 88,
    revenue: "15.2k",
    rating: "4.8",
    reviews: 88,
  },
  {
    id: "artisanal-canape-selection",
    name: "Artisanal Canapé Selection",
    category: "CATERING",
    priceLabel: "Per Head",
    price: "From £65.00",
    bookings: 210,
    revenue: "5.1k",
    rating: "4.9",
    reviews: 210,
  },
  {
    id: "heritage-classic-fleet",
    name: "Heritage Classic Fleet",
    category: "TRANSPORT",
    priceLabel: "Daily Rate",
    price: "£3,800",
    bookings: 34,
    revenue: "5.2k",
    rating: "4.6",
    reviews: 34,
  },
];

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {services.map((s) => (
        <Link
          key={s.id}
          href={`/vendor/services/${s.id}/edit`}
          className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] overflow-hidden hover:shadow-md transition"
        >
          <div className="h-36 bg-[#DCCFC0] flex items-center justify-center text-[#8B716A] text-xs">
            {s.name}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">
                  {s.category}
                </p>
                <h3 className="font-semibold text-[#2B2622] text-sm truncate">
                  {s.name}
                </h3>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="text-[#8B716A] hover:text-[#2B2622] shrink-0"
              >
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-[10px] text-[#8B7E72]">{s.priceLabel}</p>
                <p className="font-semibold text-sm text-[#2B2622]">
                  {s.price}
                </p>
              </div>
              <span className="text-xs font-medium text-[#A3391C] bg-[#EDE0D2] px-2 py-1 rounded-full">
                ★ {s.rating}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8B716A] border-t border-[#DCCFC0] mt-3 pt-3">
              <span>{s.bookings} bookings</span>
              <span>{s.revenue} revenue</span>
            </div>
          </div>
        </Link>
      ))}

      <button className="rounded-[16px] border-2 border-dashed border-[#DCCFC0] flex flex-col items-center justify-center gap-2 text-[#8B716A] hover:bg-[#F6ECE0] transition min-h-[220px]">
        <div className="w-10 h-10 rounded-full bg-[#EDE0D2] flex items-center justify-center text-[#A3391C]">
          <Plus size={20} />
        </div>
        <span className="text-sm font-medium">Create New Experience</span>
        <span className="text-xs text-center max-w-[160px]">
          Expand your portfolio with a new high-end service.
        </span>
      </button>
    </div>
  );
}