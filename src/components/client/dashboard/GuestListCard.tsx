// Real data — EventDashboard (GET /events/{id}/dashboard).
export default function GuestListCard({
  confirmed,
  pending,
  declined,
}: {
  confirmed: number;
  pending: number;
  declined: number;
}) {
  const guests = [
    { label: "Confirmed", value: confirmed, color: "text-green-700" },
    { label: "Pending", value: pending, color: "text-[#B08D3E]" },
    { label: "Declined", value: declined, color: "text-red-600" },
  ];

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Guest List</h2>

      {confirmed + pending + declined === 0 ? (
        <p className="text-sm text-[#8B716A]">No guests added yet.</p>
      ) : (
        <div className="space-y-3">
          {guests.map((g) => (
            <div key={g.label} className="flex items-center justify-between">
              <span className="text-sm text-[#2B2622]">{g.label}</span>
              <span className={`font-semibold text-sm ${g.color}`}>{g.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
