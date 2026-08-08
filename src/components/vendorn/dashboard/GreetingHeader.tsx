import { Star } from "lucide-react";
import { CalendarCheck, MessageSquare, Settings } from "lucide-react";

export default function GreetingHeader() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl md:text-2xl font-bold text-[#2B2622]">
            Good morning, Elite Florals
          </h1>

          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={13}
                className="fill-[#B08D3E] text-[#B08D3E]"
              />
            ))}
            <span className="text-xs text-[#8B716A] ml-1">4.9</span>
          </div>

          <p className="text-xs md:text-sm text-[#8B7E72] mt-2">
            Established in the industry since 2019
          </p>
        </div>

        <div className="rounded-xl bg-[#EDE0D2] px-5 py-3 text-center md:text-left w-full md:w-auto">
          <p className="text-[10px] text-[#8B7E72] uppercase tracking-wide">
            Monthly Revenue
          </p>
          <p className="text-lg md:text-xl font-bold text-[#A3391C] mt-1">
            EGP 32,450
          </p>
        </div>
      </div>
    </div>
  );
}