import { Star } from "lucide-react";

export default function TestimonialCard() {
  return (
    <div className="rounded-[16px] bg-[#1B2421] text-white p-5 md:p-6 mt-6">
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={13} className="fill-[#D97745] text-[#D97745]" />
        ))}
      </div>

      <p className="text-sm text-white/80 leading-relaxed">
        &quot;Elite Florals exceeded all our expectations! Their attention
        to detail and creative vision transformed our special day into
        something truly extraordinary.&quot;
      </p>

      <p className="text-sm font-semibold mt-4">Sophia Reed</p>
      <p className="text-xs text-white/50">Client, June 2024</p>
    </div>
  );
}