import { ShieldCheck, Star } from "lucide-react";
import { VendorProfile } from "@/services/vendorPortal.service";

export default function ProfileHero({
  profile,
  averageRating,
  reviewCount,
}: {
  profile: VendorProfile;
  averageRating: number;
  reviewCount: number;
}) {
  const initial = profile.businessName?.charAt(0)?.toUpperCase() || "V";

  return (
    <div className="relative overflow-hidden rounded-[16px] border border-[#DCCFC0]">
      {/* No real hero-banner field on VendorProfile (only a small logoUrl) —
          a plain brand-gradient stands in rather than a fabricated stock photo. */}
      <div className="h-40 md:h-56 bg-gradient-to-br from-[#2B2622] via-[#3E362E] to-[#A3391C]" />

      <div className="bg-[#F6ECE0] p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:-mt-16">
          <div className="shrink-0 -mt-20 sm:mt-0 size-24 rounded-2xl border-4 border-[#F6ECE0] bg-[#DCCFC0] overflow-hidden flex items-center justify-center text-3xl font-serif font-bold text-[#2B2622]">
            {profile.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- vendor-supplied logo URL
              <img src={profile.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {profile.isVerified && (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                  <ShieldCheck size={12} />
                  Verified Vendor
                </span>
              )}
              {reviewCount > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-[#EDE0D2] px-2.5 py-1 text-[11px] font-semibold text-[#A3391C]">
                  <Star size={12} className="fill-[#B08D3E] text-[#B08D3E]" />
                  {averageRating.toFixed(1)} Rating
                </span>
              )}
            </div>

            <h1 className="mt-2 font-serif text-2xl md:text-3xl font-bold text-[#2B2622] truncate">
              {profile.businessName || "Your Business"}
            </h1>
            {profile.city && <p className="text-sm text-[#8B7E72] mt-0.5">{profile.city}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
