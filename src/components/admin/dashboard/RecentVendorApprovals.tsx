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
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">
          Recent Vendor Approvals
        </h2>
        <button className="text-xs md:text-sm text-[#C95B2B] font-medium">
          View All
        </button>
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {approvals.map((a) => (
          <div key={a.name} className="border rounded-xl p-3 flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F6F1EB] flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
              {a.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm truncate">
                {a.name}
              </p>
              <p className="text-xs text-gray-500">{a.category}</p>
              <p className="text-xs text-gray-400">{a.date}</p>
            </div>
            <button className="text-xs font-medium border rounded-lg px-3 py-1.5 h-fit text-gray-700 hover:bg-gray-50 shrink-0">
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead className="text-left text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="pb-3">Business Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Date Applied</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => (
              <tr key={a.name} className="border-t">
                <td className="py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F6F1EB] flex items-center justify-center text-xs font-semibold text-gray-600">
                    {a.id}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.location}</p>
                  </div>
                </td>
                <td className="text-gray-600 text-sm">{a.category}</td>
                <td className="text-gray-500 text-sm">{a.date}</td>
                <td>
                  <button className="text-xs font-medium border rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50">
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