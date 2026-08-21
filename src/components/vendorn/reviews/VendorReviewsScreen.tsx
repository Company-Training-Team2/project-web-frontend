"use client";

import { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import {
  vendorPortalService,
  getVendorPortalErrorMessage,
  VendorReview,
} from "@/services/vendorPortal.service";

// REV-001: the sidebar linked here (VendorSidebar.tsx: "Reviews" ->
// /vendor/reviews) but no page ever existed at that route, so it 404'd.
// GET /api/vendor/reviews (VendorController.GetReviews) and
// vendorPortalService.getReviews() were both already real and working —
// this was purely a missing screen to call them from.
export default function VendorReviewsScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();

  const [reviews, setReviews] = useState<VendorReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isVendor) return;
    vendorPortalService
      .getReviews()
      .then(setReviews)
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load your reviews.")));
  }, [isVendor]);

  if (authLoading || !isVendor) return null;

  const averageRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCCFC0] pb-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#2B2622]">Reviews</h1>
            <p className="mt-1 text-sm text-[#8B7E72]">What customers are saying across all your services.</p>
          </div>
          {averageRating ? (
            <div className="flex items-center gap-2 rounded-[12px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-2">
              <Star className="size-5 fill-[#D4A339] text-[#D4A339]" />
              <span className="font-serif text-xl font-bold text-[#2B2622]">{averageRating}</span>
              <span className="text-xs text-[#8B7E72]">({reviews!.length} review{reviews!.length === 1 ? "" : "s"})</span>
            </div>
          ) : null}
        </div>

        <div className="mt-6">
          {reviews === null && !error ? (
            <div className="flex items-center justify-center gap-2 py-16 text-[#8B7E72]">
              <Loader2 className="size-5 animate-spin" />
              Loading reviews…
            </div>
          ) : error ? (
            <p className="py-16 text-center text-sm text-[#A3391C]">{error}</p>
          ) : reviews!.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#8B7E72]">
              No reviews yet — they&apos;ll show up here once customers rate a completed booking.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reviews!.map((review) => (
                <div key={review.id} className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#2B2622]">{review.customerName}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${i < review.rating ? "fill-[#D4A339] text-[#D4A339]" : "text-[#DCCFC0]"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-[#8B7E72]">{review.workPostTitle}</p>
                  {review.comment ? (
                    <p className="mt-3 text-sm text-[#2B2622]">{review.comment}</p>
                  ) : null}
                  <p className="mt-3 text-[11px] text-[#A79A90]">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <VendorBottomNav />
    </div>
  );
}
