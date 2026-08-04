export default function VolumeChart() {
  const bars = [30, 45, 60, 80, 140, 90];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">
            Volume Intelligence
          </h2>

          <p className="text-gray-500 text-sm">
            Monthly platform activity
          </p>
        </div>

        <span className="text-sm text-gray-500">
          Previous vs Current
        </span>
      </div>

      <div className="flex items-end justify-between mt-10 h-36">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={`w-10 rounded-t-md ${
              index === 4 ? "bg-[#B84E22]" : "bg-gray-200"
            }`}
            style={{ height: `${bar}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span>APR</span>
        <span>MAY</span>
        <span>JUN</span>
      </div>
    </div>
  );
}