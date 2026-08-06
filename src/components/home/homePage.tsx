"use client";

import {
  Search,
  SlidersHorizontal,
  Bell,
  MapPin,
  Star,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

const categories = [
  { name: "Weddings", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Venues", image: "https://i.pravatar.cc/300?img=12" },
  { name: "Corporate Events", image: "https://i.pravatar.cc/300?img=13" },
  { name: "Birthdays", image: "https://i.pravatar.cc/300?img=14" },
];

const vendors = [
  {
    name: "Savoré House",
    tag: "Fine Dining Catering",
    location: "Alex, Egypt",
    price: "120 EGP",
    rating: "4.9",
    image: "https://i.pravatar.cc/400/260?img=21",
  },
  {
    name: "Atelier Fleur",
    tag: "Floral Design",
    location: "Cairo, Egypt",
    price: "4,200 EGP",
    rating: "4.8",
    image: "https://i.pravatar.cc/400/260?img=22",
  },
  {
    name: "Grand Hall Venue",
    tag: "Event Venue",
    location: "Giza, Egypt",
    price: "18,000 EGP",
    rating: "4.7",
    image: "https://i.pravatar.cc/400/260?img=23",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#DCCFC0] bg-[#FBF3EA] px-8 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#8B7E72]">
              Good morning
            </p>
            <h1 className="font-serif text-2xl font-bold text-[#2B2622]">
              Amara Okonkwo
            </h1>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7E72]" />
              <input
                type="text"
                placeholder="Search vendors, venues, styles..."
                className="w-full rounded-full border border-[#DCCFC0] bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#8B7E72] focus:border-[#A3391C]"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCCFC0] bg-white text-[#8B7E72] hover:bg-[#F5EDE0]">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCCFC0] bg-white text-[#8B7E72] hover:bg-[#F5EDE0]">
              <Bell className="h-4 w-4" />
            </button>
            <img
              src="https://i.pravatar.cc/80?img=47"
              alt="Amara Okonkwo"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="px-8 py-8">
          {/* Hero */}
          <div className="relative mb-10 overflow-hidden rounded-[24px]">
            <img
              src="https://i.pravatar.cc/1200/420?img=31"
              alt=""
              className="h-[300px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <span className="absolute left-8 top-8 rounded-full bg-[#A3391C] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Editor&apos;s Pick
            </span>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="max-w-lg font-serif text-3xl font-bold leading-tight">
                Royal Wedding at Four Seasons Alexandria
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Full-service styling with elegant décor and 5-star catering.
                Luxury wedding packages starting from 180,000 EGP.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A3391C]">
                  Curated categories
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#2B2622]">
                  Popular categories
                </h3>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-[#A3391C] hover:underline">
                See all
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className="group relative h-32 overflow-hidden rounded-2xl"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <span className="absolute bottom-3 left-4 text-sm font-semibold text-white">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured vendors */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A3391C]">
                  Vetted &amp; trusted
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#2B2622]">
                  Featured vendors
                </h3>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-[#A3391C] hover:underline">
                See all
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.map((v) => (
                <div
                  key={v.name}
                  className="overflow-hidden rounded-2xl border border-[#DCCFC0] bg-[#F5EDE0]"
                >
                  <div className="relative h-40">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[#2B2622]">
                      <Star className="h-3 w-3 fill-[#D4A24C] text-[#D4A24C]" />
                      {v.rating}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#A3391C]">
                      {v.tag}
                    </p>
                    <h4 className="mt-1 text-base font-semibold text-[#2B2622]">
                      {v.name}
                    </h4>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#8B7E72]">
                      <MapPin className="h-3 w-3" />
                      {v.location}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#2B2622]">
                        {v.price}
                      </span>
                      <button className="rounded-lg bg-[#A3391C] px-4 py-2 text-xs font-semibold text-white hover:opacity-90">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Premium packages */}
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#A3391C]">
                All-inclusive
              </p>
              <h3 className="mb-4 text-lg font-semibold text-[#2B2622]">
                Premium packages
              </h3>

              <div className="relative overflow-hidden rounded-2xl bg-[#2F4A3E] p-6 text-white">
                <p className="text-sm font-medium uppercase tracking-wide text-[#D4A24C]">
                  Full-Service Celebration
                </p>
                <h4 className="mt-2 max-w-xs text-xl font-semibold">
                  Venue, catering, florals &amp; design — managed end to end
                </h4>
                <p className="mt-3 text-sm text-white/70">
                  from{" "}
                  <span className="font-semibold text-white">
                    32,000 EGP
                  </span>
                </p>
                <button className="mt-5 rounded-lg bg-[#D4A24C] px-5 py-2.5 text-sm font-semibold text-[#2B2622] hover:opacity-90">
                  Explore packages
                </button>
              </div>
            </div>

            {/* Upcoming booking */}
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#A3391C]">
                Your timeline
              </p>
              <h3 className="mb-4 text-lg font-semibold text-[#2B2622]">
                Upcoming booking
              </h3>

              <div className="flex items-center gap-4 rounded-2xl border border-[#DCCFC0] bg-[#F5EDE0] p-5">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#A3391C] text-white">
                  <span className="text-[10px] font-semibold uppercase">
                    May
                  </span>
                  <span className="text-lg font-bold leading-none">18</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2B2622]">
                    Savoré House Tasting
                  </p>
                  <p className="mt-0.5 text-xs text-[#8B7E72]">
                    2:30 PM · 1-hour session
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#2F4A3E]/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#2F4A3E]">
                    Confirmed
                  </span>
                </div>
                <Calendar className="h-5 w-5 shrink-0 text-[#8B7E72]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}