import SectionEyebrow from "@/components/shared/SectionEyebrow";
import PriceStepper from "@/components/shared/PriceStepper";

export default function GuestCountCard({
  guestCount,
  onChange,
}: {
  guestCount: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Head Count</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Guests</h3>

      <div className="mt-3 flex items-center justify-between rounded-[14px] border border-[#e5ded2] bg-white p-4">
        <div>
          <p className="text-[14px] font-bold text-[#252323]">Estimated attendees</p>
          <p className="text-[12px] text-[#a79a90]">Priced per guest</p>
        </div>
        <PriceStepper value={guestCount} onChange={onChange} min={1} max={2000} step={5} />
      </div>
    </div>
  );
}
