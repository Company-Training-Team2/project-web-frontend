export default function InlineEventCard({
  date,
  title,
  subtitle,
  ctaLabel,
}: {
  date: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}) {
  const [month, day] = date.split(" ");

  return (
    <div className="flex w-full max-w-[320px] items-center justify-between rounded-[14px] border border-[#e5ded2] bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="flex w-11 flex-col items-center rounded-[8px] bg-[#f3ede3] py-1.5 text-center">
          <span className="text-[9px] font-bold uppercase text-[#af3718]">{month}</span>
          <span className="text-[14px] font-bold text-[#252323]">{day}</span>
        </div>
        <div>
          <p className="text-[13px] font-bold text-[#252323]">{title}</p>
          <p className="text-[12px] text-[#6d5d54]">{subtitle}</p>
        </div>
      </div>
      <button className="rounded-full bg-[#f3ede3] px-3 py-1.5 text-[12px] font-bold text-[#252323]">
        {ctaLabel}
      </button>
    </div>
  );
}
