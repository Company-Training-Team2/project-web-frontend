import { CheckCircle2, Edit3, Flag, XCircle } from "lucide-react";

export default function ApprovalActionBar({
  onReport,
  onReject,
  onRequestChanges,
  onApprove,
}: {
  onReport: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="sticky bottom-0 flex flex-col gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 sm:flex-row sm:items-center sm:justify-between">
      <button onClick={onReport} className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#8B716A] hover:text-[#A3391C]">
        <Flag size={14} />
        Report Vendor
      </button>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={onReject}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#DCCFC0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#2B2622] hover:bg-[#EDE0D2]"
        >
          <XCircle size={15} />
          Reject Application
        </button>
        <button
          onClick={onRequestChanges}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#c59c42] px-4 py-2.5 text-[13px] font-medium text-white hover:opacity-90"
        >
          <Edit3 size={15} />
          Request Changes
        </button>
        <button
          onClick={onApprove}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#A3391C] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#8a2f16]"
        >
          <CheckCircle2 size={15} />
          Approve Vendor
        </button>
      </div>
    </div>
  );
}
