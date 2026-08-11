"use client";

import { useState } from "react";
import { Calendar, Users } from "lucide-react";
import { toast } from "sonner";

import { parseDateOnly } from "@/lib/date";
import { VendorBooking, vendorPortalService, getVendorPortalErrorMessage } from "@/services/vendorPortal.service";

const statusBadge: Record<string, string> = {
  Pending: "bg-[#EDE0D2] text-[#B08D3E]",
  Accepted: "bg-green-100 text-green-700",
  Paid: "bg-green-100 text-green-700",
  Completed: "bg-[#DCE7E2] text-[#3F6656]",
  Cancelled: "bg-red-100 text-red-600",
  Rejected: "bg-red-100 text-red-600",
};

function monthsUntil(dateStr: string): string {
  const target = parseDateOnly(dateStr);
  const now = new Date();
  const months = Math.max(
    0,
    (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth())
  );
  return months === 0 ? "This month" : `${months} Month${months === 1 ? "" : "s"} to Event`;
}

export default function BookingRequestCard({
  booking,
  onUpdated,
}: {
  booking: VendorBooking;
  onUpdated: (updated: VendorBooking) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState<"approve" | "decline" | "complete" | null>(null);

  const handleAction = async (action: "approve" | "decline" | "complete") => {
    setIsSubmitting(action);
    try {
      const updated =
        action === "approve"
          ? await vendorPortalService.approveBooking(booking.id)
          : action === "decline"
            ? await vendorPortalService.declineBooking(booking.id)
            : await vendorPortalService.completeBooking(booking.id);
      onUpdated(updated);
      toast.success(
        action === "approve"
          ? "Booking approved."
          : action === "decline"
            ? "Booking declined."
            : "Booking marked complete."
      );
    } catch (error) {
      toast.error(getVendorPortalErrorMessage(error, "Couldn't update this booking. Try again."));
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#A3391C]/10 font-serif text-lg font-bold text-[#A3391C]">
            {booking.customerName?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <h3 className="font-serif text-base font-bold leading-tight text-[#2B2622]">
              {booking.customerName}
            </h3>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8B716A]">
              {booking.workPostTitle}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            statusBadge[booking.status] ?? "bg-[#EDE0D2] text-[#8B7E72]"
          }`}
        >
          {booking.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8B716A]">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {parseDateOnly(booking.bookingDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={13} />
          {booking.quantity} Guests
        </span>
        <span className="font-semibold text-[#A3391C]">EGP {booking.totalPrice.toLocaleString()}</span>
      </div>

      {booking.notes && (
        <p className="mt-3 border-l-2 border-[#DCCFC0] pl-3 text-sm italic leading-relaxed text-[#2B2622]">
          &quot;{booking.notes}&quot;
        </p>
      )}

      {booking.status === "Pending" && (
        <>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#8B716A]">
            <span>Planning Timeline</span>
            <span>{monthsUntil(booking.bookingDate)}</span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleAction("decline")}
              disabled={isSubmitting !== null}
              className="flex-1 rounded-xl border border-[#DCCFC0] py-2.5 text-sm font-medium text-[#A3391C] hover:bg-[#EDE0D2] disabled:opacity-50"
            >
              {isSubmitting === "decline" ? "Declining…" : "Decline"}
            </button>
            <button
              onClick={() => handleAction("approve")}
              disabled={isSubmitting !== null}
              className="flex-1 rounded-xl bg-[#A3391C] py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting === "approve" ? "Approving…" : "Approve Request"}
            </button>
          </div>
        </>
      )}

      {booking.status === "Paid" && (
        <div className="mt-4 flex items-center justify-between border-t border-[#DCCFC0] pt-3">
          <span className="text-xs text-green-700">Payment received</span>
          <button
            onClick={() => handleAction("complete")}
            disabled={isSubmitting !== null}
            className="text-xs font-medium text-[#A3391C] disabled:opacity-50"
          >
            {isSubmitting === "complete" ? "Updating…" : "Mark Completed"}
          </button>
        </div>
      )}
    </div>
  );
}
