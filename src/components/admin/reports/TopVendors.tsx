const vendors = [
  {
    name: "Lafoda Palace",
    bookings: 14,
  },
  {
    name: "Royal Hall",
    bookings: 12,
  },
  {
    name: "Grand Events",
    bookings: 8,
  },
  {
    name: "Classic Venue",
    bookings: 6,
  },
];

export default function TopVendors() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="font-bold text-lg">
        Market Leaders
      </h2>

      <div className="space-y-4 mt-5">
        {vendors.map((vendor) => (
          <div
            key={vendor.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300" />

              <div>
                <h3 className="font-semibold">
                  {vendor.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Venue Partner
                </p>
              </div>
            </div>

            <span className="text-[#C75B29] font-semibold">
              {vendor.bookings} Bookings
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}