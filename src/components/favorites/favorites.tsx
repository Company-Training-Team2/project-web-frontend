"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Search,
  Star,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { favoritesService, FavoriteItem } from "@/services/favorites.service";
import BottomNav from "@/components/shared/BottomNav";

// Real backend wiring — FavoritesController is genuinely live
// (GET /favorites, POST /favorites/toggle). Previously this page used a
// hardcoded fixture array and was wrapped in the *admin* Sidebar shell,
// which doesn't belong on a customer page — both fixed here.
export default function FavoritesPage() {
  useRequireAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const load = async () => {
    setError(null);
    try {
      const data = await favoritesService.getMyFavorites();
      setFavorites(data);
    } catch {
      setError("Couldn't load your favorites. Check your connection and try again.");
    }
  };

  useEffect(() => {
    // One-time fetch on mount — not derived state, a real network call.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleRemove = async (workPostId: number) => {
    setRemovingId(workPostId);
    try {
      await favoritesService.toggle(workPostId);
      setFavorites((prev) => prev?.filter((f) => f.workPost.id !== workPostId) ?? prev);
    } catch {
      // Leave the item in place on failure — nothing to revert since we
      // didn't optimistically remove it.
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      {/* BottomNav only hides at lg: (see shared/BottomNav.tsx), so the
          bottom-clearance padding must stay through md: too, not just
          revert once md:p-8's shorthand would otherwise override it. */}
      <main className="mx-auto w-full max-w-4xl p-4 pb-24 md:p-8 md:pb-24 lg:pb-8">
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

          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7E72]" />
            <input
              type="text"
              placeholder="Search favorites..."
              className="w-full rounded-full border border-[#DCCFC0] bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#8B7E72] focus:border-[#A3391C] focus:ring-1 focus:ring-[#A3391C]"
            />
          </div>
        </div>

        {favorites === null && !error ? (
          <div className="flex items-center justify-center gap-2 py-20 text-[#8B7E72]">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading favorites…
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="flex flex-col gap-6">
            {favorites.map(({ favoriteId, workPost }) => (
              <div
                key={favoriteId}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#E3DCD2] shadow-sm transition hover:shadow-md sm:flex-row sm:h-56"
              >
                <div className="relative h-48 w-full shrink-0 bg-[#EDE0D2] sm:h-full sm:w-56 sm:min-w-[14rem]">
                  {workPost.primaryImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- vendor photos come from arbitrary backend-hosted URLs
                    <img
                      src={workPost.primaryImageUrl}
                      alt={workPost.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-[#D4A24C] text-[#D4A24C]" />
                    <span className="font-bold">{workPost.averageRating.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={() => handleRemove(workPost.id)}
                    disabled={removingId === workPost.id}
                    aria-label="Remove from favorites"
                    className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md text-[#A3391C] hover:bg-[#F5EDE0] transition disabled:opacity-50"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2B2622] group-hover:text-[#A3391C] transition-colors">
                      {workPost.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#8B7E72]">
                      {workPost.categoryName} • {workPost.city}
                    </p>
                    <p className="text-xs text-[#8B7E72]">{workPost.vendorBusinessName}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#F0EAE2] pt-4">
                    <span className="text-xs font-semibold text-[#2B2622]">
                      Starting from EGP {workPost.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/vendors/${workPost.id}`}
                        className="rounded-lg border border-[#DCCFC0] bg-white px-4 py-2 text-xs font-semibold text-[#2B2622] transition hover:bg-[#FBF3EA]"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/booking/reserve?vendorId=${workPost.id}`}
                        className="flex items-center justify-center gap-1 rounded-lg bg-[#A3391C] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#8B2E17]"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCCFC0] bg-white py-20 text-center">
            <Heart className="h-12 w-12 text-[#DCCFC0]" />
            <h3 className="mt-4 text-lg font-semibold text-[#2B2622]">No favorites yet</h3>
            <p className="mt-1 text-sm text-[#8B7E72]">Start browsing and save your top vendors here.</p>
            <Link
              href="/vendors"
              className="mt-6 inline-block rounded-full bg-[#A3391C] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Browse Vendors
            </Link>
          </div>
        )}
      </main>

      <BottomNav active="favorites" />
    </div>
  );
}
