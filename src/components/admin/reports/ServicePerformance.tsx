export default function ServicePerformance() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
      <h2 className="font-bold text-xl mb-8">
        Service Performance
      </h2>

      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-[8px] border-green-500 flex items-center justify-center">
            <span className="font-bold text-2xl">92%</span>
          </div>

          <p className="mt-4 font-semibold">
            Completion Rate
          </p>

          <span className="text-sm text-gray-500">
            Confirmed Bookings
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-[8px] border-orange-500 flex items-center justify-center">
            <span className="font-bold text-2xl">75%</span>
          </div>

          <p className="mt-4 font-semibold">
            Re-Booking Rate
          </p>

          <span className="text-sm text-gray-500">
            Returning Clients
          </span>
        </div>
      </div>
    </div>
  );
}