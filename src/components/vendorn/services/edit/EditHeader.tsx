import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-[#F4E3C8] text-[#B08D3E]",
  Rejected: "bg-red-100 text-[#A3391C]",
  Draft: "bg-[#DCCFC0] text-[#8B716A]",
};

const statusLabel: Record<string, string> = {
  Approved: "Live",
  Pending: "Pending Review",
  Rejected: "Rejected",
  Draft: "Draft",
};

export default function EditHeader({
  name,
  status = "Draft",
}: {
  name: string;
  status?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
      <div>
        <Link
          href="/vendor/services"
          className="flex items-center gap-1 text-xs text-[#8B716A] hover:text-[#2B2622] mb-2"
        >
          <ChevronLeft size={14} />
          Back to Services
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#A3391C] truncate">
          {name || "New Service"}
        </h1>
      </div>

      <span
        className={`text-xs font-medium px-3 py-1.5 rounded-full w-fit ${
          statusStyles[status] ?? statusStyles.Draft
        }`}
      >
        {statusLabel[status] ?? status}
      </span>
    </div>
  );
}
