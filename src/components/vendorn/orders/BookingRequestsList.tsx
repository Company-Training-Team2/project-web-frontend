import BookingRequestCard, { Booking } from "./BookingRequestCard";

const bookings: Booking[] = [
  {
    id: "1",
    status: "New Request",
    clientName: "Amara Okonkwo",
    packageName: "Signature Banquet",
    price: "£27,090",
    date: "May 18, 2025",
    guests: 120,
    message:
      "We are so excited to host our wedding at your venue. We'd love to discuss the floral arrangements and potential late-night snack options for our guests...",
  },
  {
    id: "2",
    status: "Approved",
    clientName: "Julien Marchand",
    packageName: "",
    price: "£12,400",
    date: "June 02, 2025",
    guests: 45,
    note: "Payment Received",
  },
  {
    id: "3",
    status: "Declined",
    clientName: "Sarah Jenkins",
    packageName: "",
    price: "",
    date: "",
    note: "Date Unavailable: March 12, 2025",
  },
];

export default function BookingRequestsList() {
  return (
    <div className="px-4 md:px-6 pt-4 pb-28 md:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {bookings.map((b) => (
          <BookingRequestCard key={b.id} booking={b} />
        ))}
      </div>
    </div>
  );
}