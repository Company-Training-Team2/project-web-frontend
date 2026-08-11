export default function BookingsHeader({
  pendingCount,
  confirmedCount,
}: {
  pendingCount: number;
  confirmedCount: number;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 md:flex-row md:items-start md:justify-between md:px-8">
      <div className="max-w-xl">
        <h1 className="font-serif text-[28px] font-bold text-[#2B2622] md:text-[34px]">
          Booking Requests
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-[#8B7E72] md:text-sm">
          Review and manage your incoming inquiries. Maintain your signature standard of
          excellence through timely responses.
        </p>
      </div>

      <div className="flex shrink-0 gap-6">
        <div className="text-center">
          <p className="font-serif text-2xl font-bold text-[#A3391C]">{pendingCount}</p>
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#8B7E72]">Pending</p>
        </div>
        <div className="text-center">
          <p className="font-serif text-2xl font-bold text-[#2B2622]">{confirmedCount}</p>
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#8B7E72]">Confirmed</p>
        </div>
      </div>
    </div>
  );
}
