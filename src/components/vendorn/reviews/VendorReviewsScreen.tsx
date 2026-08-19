"use client";

import { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import {
  VendorReview,
  vendorPortalService,
  getVendorPortalErrorMessage,
} from "@/services/vendorPortal.service";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= rating ? "fill-[#E5A83E] text-[#E5A83E]" : "text-[#DCCFC0]"}
        />
      ))}
    </div>
  );
}

// GET /api/vendor/reviews — real endpoint, added alongside this screen
// (previously /vendor/reviews 404'd: VendorSidebar linked to it, but neither
// the route nor a backend endpoint for "this vendor's reviews across all
// their services" existed — only per-review-count stats on the dashboard).
export default function VendorReviewsScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const [reviews, setReviews] = useState<VendorReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    vendorPortalService
      .getReviews()
      .then(setReviews)
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load your reviews.")));
  };

  useEffect(() => {
    if (!isVendor) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isVendor]);

  if (authLoading || !isVendor) return null;

  const averageRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#EDE0D2]">
      <VendorSidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <div className="flex flex-col gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5">
          <h1 className="font-serif text-lg font-bold text-[#2B2622]">Reviews</h1>
          {averageRating ? (
            <div className="flex items-center gap-2 text-sm text-[#2B2622]">
              <StarRow rating={Math.round(Number(averageRating))} />
              <span className="font-semibold">{averageRating}</span>
              <span className="text-[#8B7E72]">({reviews!.length} review{reviews!.length === 1 ? "" : "s"})</span>
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : reviews === null ? (
          <div className="mt-6 flex items-center justify-center gap-2 py-24 text-[#8B7E72]">
            <Loader2 className="size-5 animate-spin" />
            Loading reviews…
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-24 text-center text-[#8B7E72]">
            <Star size={28} className="text-[#DCCFC0]" />
            <p className="text-sm">No reviews yet.</p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#2B2622]">{r.customerName}</p>
                    <p className="text-xs text-[#8B7E72]">{r.workPostTitle}</p>
                  </div>
                  <StarRow rating={r.rating} />
                </div>
                {r.comment ? (
                  <p className="mt-3 text-sm leading-relaxed text-[#2B2622]">{r.comment}</p>
                ) : null}
                <p className="mt-3 text-xs text-[#8B7E72]">
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
