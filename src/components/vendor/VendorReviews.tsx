import { Star } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { MockReview } from "@/lib/mock/types";

export default function VendorReviews({ reviews, total }: { reviews: MockReview[]; total: number }) {
  return (
    <div className="px-5 pt-6 pb-8 lg:px-10">
      <div className="flex items-center justify-between">
        <div>
          <SectionEyebrow>Loved by Clients</SectionEyebrow>
          <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Reviews</h3>
        </div>
        <button className="text-[13px] font-medium text-[#af3718]">All {total}</button>
      </div>

      <div className="mt-3 space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-[14px] border border-[#e5ded2] bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-[#e9dfd1] text-[12px] font-bold text-[#252323]">
                  {review.authorName[0]}
                </span>
                <div>
                  <p className="text-[13px] font-bold text-[#252323]">{review.authorName}</p>
                  <p className="text-[11px] text-[#a79a90]">{review.date}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[13px] font-bold text-[#252323]">
                <Star className="size-3.5 fill-[#c59c42] text-[#c59c42]" />
                {review.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-2 text-[13px] italic leading-[1.5] text-[#6d5d54]">&ldquo;{review.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
