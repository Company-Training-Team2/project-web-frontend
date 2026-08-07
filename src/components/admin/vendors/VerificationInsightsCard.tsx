import { AdminPendingVendor } from "@/lib/mock/adminVendors";

const STATUS_STYLE: Record<string, string> = {
  Passed: "bg-[#dcece1] text-[#2f5c46]",
  Success: "bg-[#dcece1] text-[#2f5c46]",
  Pending: "bg-[#f5e6c8] text-[#8a6b1f]",
  Failed: "bg-[#f7dede] text-[#8a3b3b]",
  Low: "bg-[#dcece1] text-[#2f5c46]",
  Medium: "bg-[#f5e6c8] text-[#8a6b1f]",
  High: "bg-[#f7dede] text-[#8a3b3b]",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[13px] text-[#8B716A]">{label}</span>
      <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${STATUS_STYLE[value] ?? ""}`}>{value}</span>
    </div>
  );
}

export default function VerificationInsightsCard({ verification }: { verification: AdminPendingVendor["verification"] }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#eef4ef] p-5">
      <h3 className="font-serif text-base font-bold text-[#2B2622]">Verification Insights</h3>
      <div className="mt-1 divide-y divide-[#DCCFC0]/60">
        <Row label="Identity Check" value={verification.identityCheck} />
        <Row label="Background Check" value={verification.backgroundCheck} />
        <Row label="Bank Verification" value={verification.bankVerification} />
        <Row label="Risk Level" value={verification.riskLevel} />
      </div>
    </div>
  );
}
