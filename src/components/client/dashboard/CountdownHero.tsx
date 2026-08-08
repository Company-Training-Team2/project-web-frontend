const countdown = [
  { value: "42", label: "Days" },
  { value: "18", label: "Hours" },
  { value: "35", label: "Mins" },
];

export default function CountdownHero() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-4 text-center">
      <p className="text-[10px] font-semibold text-[#8B7E72] uppercase tracking-wide">
        The Grand Gala
      </p>

      <div className="flex items-center justify-center gap-6 md:gap-10 mt-3">
        {countdown.map((c) => (
          <div key={c.label}>
            <p className="text-3xl md:text-4xl font-serif font-bold text-[#A3391C]">
              {c.value}
            </p>
            <p className="text-[10px] text-[#8B716A] uppercase tracking-wide mt-1">
              {c.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs md:text-sm text-[#8B716A] mt-4">
        September 24th, 2024 · Ritz Carlton Grand Ballroom
      </p>
    </div>
  );
}