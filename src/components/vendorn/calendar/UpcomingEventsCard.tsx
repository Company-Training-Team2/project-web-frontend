const events = [
  {
    date: "OCT\n12",
    title: "Vanderbilt Heritage Wedding",
    subtitle: "Clara Vanderbilt & Marcus Thorne",
    tag: "Confirmed",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    date: "OCT\n18",
    title: "Corporate Autumn Gala",
    subtitle: "Goldman & Co. Private Events",
    tag: "Pending",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    date: "OCT\n25",
    title: "Boutique Fashion Showcase",
    subtitle: "",
    tag: "Confirmed",
    tagColor: "bg-green-100 text-green-700",
  },
];

export default function UpcomingEventsCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-[#2B2622]">Upcoming Events</h2>
        <button className="text-xs font-medium text-[#A3391C]">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.title} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-[#EDE0D2] flex flex-col items-center justify-center text-[10px] font-semibold text-[#A3391C] leading-tight text-center shrink-0 whitespace-pre-line">
              {e.date}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2B2622] truncate">
                {e.title}
              </p>
              {e.subtitle && (
                <p className="text-xs text-[#8B716A] truncate">
                  {e.subtitle}
                </p>
              )}
            </div>

            <span
              className={`text-[10px] font-medium px-2 py-1 rounded-full shrink-0 ${e.tagColor}`}
            >
              {e.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}