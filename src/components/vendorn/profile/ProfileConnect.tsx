import { Phone, Mail, MapPin } from "lucide-react";

// Website/social links aren't backend fields on VendorProfile — dropped
// rather than faked. Phone is real (VendorProfile.phoneNumber), email comes
// from the logged-in User account (there's no separate vendor-profile email).
export default function ProfileConnect({
  phoneNumber,
  email,
  city,
}: {
  phoneNumber?: string;
  email: string;
  city?: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-[#8B7E72] mb-3">
        Connect With Us
      </h2>

      <div className="space-y-2.5 text-sm text-[#2B2622]">
        <div className="flex items-center gap-2.5">
          <Phone size={15} className="text-[#A3391C] shrink-0" />
          <span className="truncate">{phoneNumber || "No phone number set"}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail size={15} className="text-[#A3391C] shrink-0" />
          <span className="truncate">{email}</span>
        </div>
        {city && (
          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-[#A3391C] shrink-0" />
            <span className="truncate">{city}</span>
          </div>
        )}
      </div>
    </div>
  );
}
