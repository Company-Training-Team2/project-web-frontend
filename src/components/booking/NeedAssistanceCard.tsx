import Link from "next/link";

export default function NeedAssistanceCard() {
  return (
    <div className="rounded-[16px] border border-[#e5ded2] bg-white p-5">
      <h3 className="font-serif text-[16px] font-bold text-[#252323]">Need Assistance?</h3>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-[#6d5d54]">
        Our dedicated concierge team is available 24/7 to help with any adjustments to your booking.
      </p>
      <Link href="/ai-planner" className="mt-2 inline-block text-[13px] font-bold text-[#af3718] hover:underline">
        Chat with Support
      </Link>
    </div>
  );
}
