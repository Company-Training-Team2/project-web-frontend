"use client";

import { 
  Heart, 
  Search, 
  Star, 
  ChevronLeft, 
  ArrowRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";

// --- Mock Data لبطاقات الفافيوريت ---
const favorites = [
  {
    id: 1,
    name: "The Glass Orchard",
    category: "Venue • Napa Valley",
    rating: "4.9",
    reviews: "2,500+",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    price: "2,500+",
  },
  {
    id: 2,
    name: "Velvet & Crumb",
    category: "Catering • Artisan Cakes",
    rating: "5.0",
    reviews: "450+",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    price: "$450+",
  },
  {
    id: 3,
    name: "Wild Flora Design",
    category: "Decor • Floristry",
    rating: "4.8",
    reviews: "1,200+",
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=800&q=80",
    price: "$1,200+",
  },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EB] flex overflow-x-hidden">
      {/* Sidebar بتاعك */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden">
        <div className="mx-auto w-full max-w-4xl"> {/* <-- هنا التحكم في الحجم: لو عايزها أعرض خليها max-w-6xl */}
          
          {/* Top Header */}
          <div className="mb-8 flex items-center justify-between border-b border-[#E3DCD2] pb-4">
            <div className="flex items-center gap-4">
 <Link 
      href="/home" 
      className="flex items-center justify-center rounded-full border border-[#DCCFC0] bg-white p-2 text-[#2B2622] hover:bg-[#F5EDE0] transition shadow-sm w-10 h-10"
    >
      <ChevronLeft className="h-5 w-5" />
    </Link>
              <h1 className="font-serif text-2xl font-bold text-[#2B2622]">Favorites</h1>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7E72]" />
              <input
                type="text"
                placeholder="Search favorites..."
                className="w-full rounded-full border border-[#DCCFC0] bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#8B7E72] focus:border-[#A3391C] focus:ring-1 focus:ring-[#A3391C]"
              />
            </div>
          </div>

          {/* Favorites List (عمودي Website View) */}
          <div className="flex flex-col gap-6">
            {favorites.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#E3DCD2] shadow-sm transition hover:shadow-md sm:flex-row sm:h-56"
              >
                {/* Image Section - نسبة العرض مناسبة للويب */}
                <div className="relative h-48 w-full shrink-0 sm:h-full sm:w-56 sm:min-w-[14rem]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                  />
                  {/* Ratings Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-[#D4A24C] text-[#D4A24C]" />
                    <span className="font-bold">{item.rating}</span>
                  </div>
                  {/* Heart Button */}
                  <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md text-[#A3391C] hover:bg-[#F5EDE0] transition">
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2B2622] group-hover:text-[#A3391C] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#8B7E72]">
                      {item.category}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center justify-between border-t border-[#F0EAE2] pt-4">
                    {/* السعر */}
                    <span className="text-xs font-semibold text-[#2B2622]">
                      Starting from {item.price}
                    </span>

                    {/* الأزرار */}
                    <div className="flex items-center gap-3">
                      <button className="rounded-lg border border-[#DCCFC0] bg-white px-4 py-2 text-xs font-semibold text-[#2B2622] transition hover:bg-[#FBF3EA]">
                        View Details
                      </button>
                      <button className="flex items-center justify-center gap-1 rounded-lg bg-[#A3391C] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#8B2E17]">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (لو مفيش بيانات) */}
          {favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCCFC0] bg-white py-20 text-center">
              <Heart className="h-12 w-12 text-[#DCCFC0]" />
              <h3 className="mt-4 text-lg font-semibold text-[#2B2622]">No favorites yet</h3>
              <p className="mt-1 text-sm text-[#8B7E72]">Start browsing and save your top vendors here.</p>
              <button className="mt-6 rounded-full bg-[#A3391C] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Browse Vendors
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}