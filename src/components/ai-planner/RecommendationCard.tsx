import { ArrowRight, Star } from "lucide-react";

export default function RecommendationCard({
  name,
  location,
  estimate,
  rating,
}: {
  name: string;
  location: string;
  estimate: string;
  rating: number;
}) {
  return (
    <div className="mt-2 flex w-full max-w-[320px] items-center gap-3 rounded-[14px] border border-[#e5ded2] bg-white p-3">
      <div className="relative size-16 shrink-0 rounded-[10px] bg-[#e9dfd1]">
        <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-[#252323]">
          <Star className="size-2.5 fill-[#c59c42] text-[#c59c42]" />
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#af3718]">Historic Estate</p>
        <p className="truncate font-serif text-[15px] font-bold text-[#252323]">{name}</p>
        <p className="text-[12px] text-[#6d5d54]">{location}</p>
        <p className="mt-0.5 text-[13px] font-bold text-[#252323]">{estimate}</p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-[#af3718]" />
    </div>
  );
}
