export default function VolumeChart() {
  const data = [
    { month: "JAN", value: 30 },
    { month: "FEB", value: 45 },
    { month: "MAR", value: 60 },
    { month: "APR", value: 80 },
    { month: "MAY", value: 140, active: true },
    { month: "JUN", value: 90 },
  ];

  // إيجاد أكبر قيمة لحساب النسبة المئوية للارتفاع بشكل صحيح
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[300px] flex flex-col justify-between">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl text-gray-900">Volume Intelligence</h2>
          <p className="text-gray-400 text-sm">Monthly platform activity</p>
        </div>

        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
          Previous vs Current
        </span>
      </div>

      {/* Chart Bars Section */}
      <div className="grid grid-cols-6 gap-4 items-end h-40 pt-4">
        {data.map((item, index) => {
          // حساب الارتفاع النسبي بناءً على القيمة الكبرى لتجنب خروج العمود عن الإطار
          const heightPercent = Math.round((item.value / maxValue) * 100);

          return (
            <div key={index} className="flex flex-col items-center h-full justify-end group">
              {/* Tooltip خفيف عند التحويم على العمود */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-gray-800 text-white py-0.5 px-1.5 rounded mb-1">
                {item.value}
              </div>

              {/* العمود نفسه - عرض موحد w-8 مع زوايا منحنية بالكامل من الأعلى */}
              <div
                className={`w-8 rounded-t-lg transition-all duration-300 ${
                  item.active ? "bg-[#B84E22]" : "bg-gray-200"
                }`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* اسم الشهر مرتبط مباشرة بنفس العمود لضمان التوسيط */}
              <span className={`text-xs font-medium mt-3 ${item.active ? "text-[#B84E22] font-bold" : "text-gray-400"}`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}