import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

type ApprovalStatus = "Pending Review" | "Changes Requested";

type Approval = {
  id: string;
  name: string;
  category: string;
  submitted: string;
  status: ApprovalStatus;
};

const approvals: Approval[] = [
  {
    id: "luxe-blooms-boutique",
    name: "Luxe Blooms Boutique",
    category: "Floral & Decor",
    submitted: "Oct 12, 2023",
    status: "Pending Review",
  },
  {
    id: "elysian-estates",
    name: "Elysian Estates",
    category: "Venue Hire",
    submitted: "Oct 11, 2023",
    status: "Pending Review",
  },
  {
    id: "velvet-kitchen",
    name: "Velvet Kitchen",
    category: "Premium Catering",
    submitted: "Oct 10, 2023",
    status: "Changes Requested",
  },
];

const statusStyles: Record<ApprovalStatus, string> = {
  "Pending Review": "text-[#B08D3E]",
  "Changes Requested": "text-[#A3391C]",
};

export default function ApprovalsList() {
  return (
    <div className="px-4 md:px-6 pt-4 pb-28 md:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {approvals.map((a) => (
          <Link
            key={a.id}
            href={`/admin/vendor-approvals/${a.id}`}
            className="flex flex-col rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 hover:bg-[#EDE0D2] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#DCCFC0] shrink-0" />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#2B2622] truncate">
                  {a.name}
                </h3>
                <p className="text-sm text-[#8B716A]">{a.category}</p>
              </div>

              <ChevronRight size={18} className="text-[#8B716A] shrink-0" />
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#DCCFC0] text-xs">
              <span className="flex items-center gap-1.5 text-[#8B716A]">
                <Calendar size={13} />
                Submitted {a.submitted}
              </span>
              <span className={`font-semibold ${statusStyles[a.status]}`}>
                {a.status.toUpperCase()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}