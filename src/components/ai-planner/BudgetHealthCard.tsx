import { TrendingUp } from "lucide-react";

export default function BudgetHealthCard({
  amount,
  status,
  percent,
  caption,
}: {
  amount: string;
  status: string;
  percent: number;
  caption: string;
}) {
  return (
    <div className="mt-2 w-full max-w-[280px] rounded-[12px] border border-[#e5ded2] bg-[#faf6f0] p-3.5">
      <p className="flex items-center gap-1.5 text-[12px] font-bold text-[#252323]">
        <TrendingUp className="size-3.5" />
        Budget Health
      </p>
      <p className="mt-1 text-[18px] font-bold text-[#252323]">
        {amount} <span className="text-[13px] font-bold text-[#2E9E68]">{status}</span>
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e5ded2]">
        <div className="h-full rounded-full bg-[#af3718]" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-1.5 text-[11px] text-[#a79a90]">{caption}</p>
    </div>
  );
}
