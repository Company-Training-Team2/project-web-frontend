const engagements = [
  {
    tag: "CONFIRMED",
    tagColor: "bg-green-100 text-green-700",
    title: "The Thompson Wedding",
    date: "June 15, 2024",
    time: "2:00 PM",
  },
  {
    tag: "PENDING",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "Vogue Annual Gala",
    date: "June 17, 2024",
    time: "7:00 PM",
  },
  {
    tag: "CONFIRMED",
    tagColor: "bg-green-100 text-green-700",
    title: "Birthday Soirée - Isabella S.",
    date: "June 19, 2024",
    time: "6:00 PM",
  },
];

export default function UpcomingEngagements() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">Upcoming Engagements</h2>
        <button className="text-xs md:text-sm text-[#A3391C] font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {engagements.map((e) => (
          <div
            key={e.title}
            className="rounded-xl border border-[#DCCFC0] bg-white overflow-hidden"
          >
            <div className="h-28 bg-[#DCCFC0]" />

            <div className="p-3">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${e.tagColor}`}
              >
                {e.tag}
              </span>

              <h3 className="font-medium text-sm text-[#2B2622] mt-2">
                {e.title}
              </h3>
              <p className="text-xs text-[#8B716A] mt-1">
                {e.date} · {e.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}