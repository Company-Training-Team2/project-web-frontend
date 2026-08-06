const approvals = [
  {
    id: "LC",
    name: "Lumina Catering",
    category: "Food & Beverage",
    location: "Cairo, Egypt",
    date: "Today, 09:41 AM",
  },
  {
    id: "SO",
    name: "Sonic Oasis",
    category: "Entertainment",
    location: "Alexandria, Egypt",
    date: "Yesterday, 14:20",
  },
  {
    id: "TG",
    name: "The Grand Palace",
    category: "Venue",
    location: "Giza, Egypt",
    date: "Oct 12, 10:00 AM",
  },
];

export default function RecentVendorApprovals() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">
          Recent Vendor Approvals
        </h2>
        <button className="text-xs md:text-sm text-[#A3391C] font-medium">
          View All
        </button>
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {approvals.map((a) => (
          <div
            key={a.name}
            className="border border-[#DCCFC0] rounded-xl p-3 flex gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-xs font-semibold text-[#8B716A] shrink-0">
              {a.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#2B2622] text-sm truncate">
                {a.name}
              </p>
              <p className="text-xs text-[#8B716A]">{a.category}</p>
              <p className="text-xs text-[#8B7E72]">{a.date}</p>
            </div>
            <button className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-3 py-1.5 h-fit text-[#2B2622] hover:bg-[#EDE0D2] shrink-0">
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead className="text-left text-[#8B7E72] text-xs uppercase tracking-wide">
            <tr>
              <th className="pb-3">Business Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Date Applied</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => (
              <tr key={a.name} className="border-t border-[#DCCFC0]">
                <td className="py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EDE0D2] flex items-center justify-center text-xs font-semibold text-[#8B716A]">
                    {a.id}
                  </div>
                  <div>
                    <p className="font-medium text-[#2B2622]">{a.name}</p>
                    <p className="text-xs text-[#8B716A]">{a.location}</p>
                  </div>
                </td>
                <td className="text-[#8B716A] text-sm">{a.category}</td>
                <td className="text-[#8B7E72] text-sm">{a.date}</td>
                <td>
                  <button className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-3 py-1.5 text-[#2B2622] hover:bg-[#EDE0D2]">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}