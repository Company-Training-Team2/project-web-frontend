import { MessageSquare } from "lucide-react";

const enquiries = [
  { name: "Emma S.", message: "Interested in wedding package for..." },
  { name: "James R.", message: "Do you offer corporate event..." },
  { name: "Olivia K.", message: "Can we schedule a consultation..." },
];

export default function RecentEnquiries() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5 mt-6">
      <h2 className="font-semibold text-sm text-[#2B2622] mb-4">
        Recent Enquiries
      </h2>

      <div className="space-y-3">
        {enquiries.map((e) => (
          <div key={e.name} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#DCCFC0] shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#2B2622] truncate">
                {e.name}
              </p>
              <p className="text-xs text-[#8B716A] truncate">{e.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center justify-center gap-2 w-full mt-4 bg-[#A3391C] text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90">
        <MessageSquare size={14} />
        Start Message Center
      </button>
    </div>
  );
}