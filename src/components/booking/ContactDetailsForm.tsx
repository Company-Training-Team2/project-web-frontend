import SectionEyebrow from "@/components/shared/SectionEyebrow";

// Read-only confirmation of who's being contacted about this booking —
// pulled straight from the signed-in account rather than editable inputs,
// since there's nowhere else for these values to come from at checkout.
// AuthUser (src/services/auth.service.ts) doesn't carry a phone number yet,
// so that row is only shown when one is passed in.
export default function ContactDetailsForm({
  fullName,
  email,
  phone,
}: {
  fullName: string;
  email: string;
  phone?: string;
}) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Where to reach you</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Contact Information</h3>

      <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 rounded-[14px] border border-[#e5ded2] bg-white p-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#a79a90]">Full Name</p>
          <p className="mt-0.5 text-[14px] font-medium text-[#252323]">{fullName || "—"}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#a79a90]">Email Address</p>
          <p className="mt-0.5 text-[14px] font-medium text-[#252323]">{email || "—"}</p>
        </div>
        {phone ? (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#a79a90]">Phone Number</p>
            <p className="mt-0.5 text-[14px] font-medium text-[#252323]">{phone}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
