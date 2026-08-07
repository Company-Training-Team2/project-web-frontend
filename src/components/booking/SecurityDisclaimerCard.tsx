import { Lock } from "lucide-react";

export default function SecurityDisclaimerCard() {
  return (
    <div className="px-5 lg:px-10">
      <div className="flex items-center gap-3 py-4 text-[#a79a90]">
        <span className="h-px flex-1 bg-[#e5ded2]" />
        <Lock className="size-4" />
        <span className="h-px flex-1 bg-[#e5ded2]" />
      </div>
      <div className="rounded-[12px] bg-[#f3ede3] p-4 text-center text-[13px] leading-[1.5] text-[#6d5d54]">
        Your payment information is encrypted and handled securely by InstaPay.
        <br />
        EventHub never shares your account details with vendors.
      </div>
    </div>
  );
}
