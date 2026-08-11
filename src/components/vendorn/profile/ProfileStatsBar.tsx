export default function ProfileStatsBar({
  averageRating,
  totalBookings,
  totalWorkPosts,
  reviewCount,
}: {
  averageRating: number;
  totalBookings: number;
  totalWorkPosts: number;
  reviewCount: number;
}) {
  const stats = [
    { label: "Rating", value: averageRating > 0 ? averageRating.toFixed(1) : "—" },
    { label: "Bookings", value: totalBookings.toLocaleString() },
    { label: "Services", value: totalWorkPosts.toLocaleString() },
    { label: "Reviews", value: reviewCount.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#DCCFC0] rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] py-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center px-2">
          <p className="text-[10px] uppercase tracking-wide text-[#8B7E72]">{s.label}</p>
          <p className="mt-1 text-lg md:text-xl font-bold text-[#A3391C]">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
