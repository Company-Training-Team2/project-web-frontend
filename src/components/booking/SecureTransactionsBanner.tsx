import SectionEyebrow from "@/components/shared/SectionEyebrow";

export default function SecureTransactionsBanner() {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Secure Transactions</SectionEyebrow>
      <p className="mt-2 text-[15px] leading-[1.5] text-[#252323]">
        Manage your saved payment methods for a seamless booking experience across the EventHub ecosystem.
      </p>
    </div>
  );
}
