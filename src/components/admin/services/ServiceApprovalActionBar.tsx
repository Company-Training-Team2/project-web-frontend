import { CheckCircle2, XCircle } from "lucide-react";

export default function ServiceApprovalActionBar({
  onReject,
  onApprove,
}: {
  onReject: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="sticky bottom-0 flex flex-col gap-2 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 sm:flex-row sm:justify-end">
      <button
        onClick={onReject}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-[#DCCFC0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#2B2622] hover:bg-[#EDE0D2]"
      >
        <XCircle size={15} />
        Reject Listing
      </button>
      <button
        onClick={onApprove}
        className="flex items-center justify-center gap-1.5 rounded-xl bg-[#A3391C] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#8a2f16]"
      >
        <CheckCircle2 size={15} />
        Approve Listing
      </button>
    </div>
  );
}
