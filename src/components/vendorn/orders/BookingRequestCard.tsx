import { Calendar, Users } from "lucide-react";

export type BookingStatus = "New Request" | "Approved" | "Declined";

export type Booking = {
  id: string;
  status: BookingStatus;
  clientName: string;
  packageName: string;
  price: string;
  date: string;
  guests?: number;
  message?: string;
  note?: string;
};

const statusBadge: Record<BookingStatus, string> = {
  "New Request": "bg-[#EDE0D2] text-[#B08D3E]",
  Approved: "bg-green-100 text-green-700",
  Declined: "bg-red-100 text-red-600",
};

export default function BookingRequestCard({ booking }: { booking: Booking }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusBadge[booking.status]}`}
        >
          {booking.status.toUpperCase()}
        </span>
        <p className="font-semibold text-[#A3391C] text-right shrink-0">
          {booking.price}
          <span className="block text-[10px] font-normal text-[#8B7E72]">
            {booking.packageName}
          </span>
        </p>
      </div>

      <h3
        className={`font-serif text-lg font-bold mt-2 ${
          booking.status === "Declined" ? "text-[#8B7E72]" : "text-[#2B2622]"
        }`}
      >
        {booking.clientName}
      </h3>

      <div className="flex items-center gap-4 text-xs text-[#8B716A] mt-2">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {booking.date}
        </span>
        {booking.guests && (
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {booking.guests} Guests
          </span>
        )}
      </div>

      {booking.message && (
        <p className="text-sm text-[#2B2622] italic leading-relaxed mt-3 border-l-2 border-[#DCCFC0] pl-3">
          &quot;{booking.message}&quot;
        </p>
      )}

      {booking.status === "New Request" && (
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-[#A3391C] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90">
            Approve
          </button>
          <button className="flex-1 border border-[#DCCFC0] text-[#A3391C] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2]">
            Decline
          </button>
        </div>
      )}

      {booking.status === "Approved" && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#DCCFC0]">
          {booking.note && (
            <span className="text-xs text-green-700">{booking.note}</span>
          )}
          <button className="text-xs font-medium text-[#A3391C] ml-auto">
            View Booking
          </button>
        </div>
      )}

      {booking.status === "New Request" ? null : booking.status === "Approved" ? null : (
        <p className="text-xs text-[#8B7E72] mt-3">{booking.note}</p>
      )}

      {booking.status === "New Request" && (
        <button className="text-xs font-medium text-[#A3391C] mt-3">
          View Details →
        </button>
      )}
    </div>
  );
}