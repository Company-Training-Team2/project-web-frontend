const services = [
  { name: "Payment Gateway", latency: "12ms" },
  { name: "Vendor API", latency: "45ms" },
  { name: "Image Processing", latency: "8ms" },
  { name: "Database Cluster", latency: "18ms" },
];

export default function SystemHealthStatus() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6 h-full">
      <h2 className="font-semibold text-[#2B2622]">System Health Status</h2>

      <div className="flex justify-center mt-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#EDE0D2"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#A3391C"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={2 * Math.PI * 42 * (1 - 0.982)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#A3391C]">98.2%</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs text-[#8B716A] uppercase tracking-wide mb-3">
          Core Services
        </p>

        <ul className="space-y-2.5 text-sm">
          {services.map((s) => (
            <li key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#2B2622]">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                {s.name}
              </div>
              <span className="text-[#8B716A] text-xs">{s.latency}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}