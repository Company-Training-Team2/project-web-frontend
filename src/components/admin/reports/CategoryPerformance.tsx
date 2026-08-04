import TopVendors from "./TopVendors";

const data = [
  {
    title: "Venue & Events",
    value: "65%",
  },
  {
    title: "Wedding",
    value: "52%",
  },
  {
    title: "Food Catering",
    value: "38%",
  },
  {
    title: "Photography",
    value: "28%",
  },
];

export default function CategoryPerformance() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-bold text-lg">
          Category Performance
        </h2>

        <div className="space-y-5 mt-6">
          {data.map((item) => (
            <div key={item.title}>
              <div className="flex justify-between text-sm mb-2">
                <span>{item.title}</span>

                <span>{item.value}</span>
              </div>

              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-[#C75B29]"
                  style={{
                    width: item.value,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <TopVendors />
    </div>
  );
}