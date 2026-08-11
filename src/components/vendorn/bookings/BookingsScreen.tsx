"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { VendorBooking, vendorPortalService, getVendorPortalErrorMessage } from "@/services/vendorPortal.service";
import BookingsTopBar from "./BookingsTopBar";
import BookingsHeader from "./BookingsHeader";
import BookingsTabs, { BookingsTab } from "./BookingsTabs";
import BookingRequestCard from "./BookingRequestCard";

const TAB_TO_STATUS: Record<BookingsTab, string[]> = {
  Pending: ["Pending"],
  Confirmed: ["Accepted", "Paid"],
  Cancelled: ["Cancelled", "Rejected"],
  Completed: ["Completed"],
};

export default function BookingsScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const [tab, setTab] = useState<BookingsTab>("Pending");
  const [bookings, setBookings] = useState<VendorBooking[] | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadTab = async (activeTab: BookingsTab) => {
    setBookings(null);
    setError(null);
    try {
      const statuses = TAB_TO_STATUS[activeTab];
      const results = await Promise.all(statuses.map((s) => vendorPortalService.getBookings(s)));
      setBookings(results.flat());
    } catch (err) {
      setError(getVendorPortalErrorMessage(err, "Couldn't load bookings. Try again."));
    }
  };

  useEffect(() => {
    if (!isVendor) return;
    // Real network call driven by the active tab, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTab(tab);
  }, [tab, isVendor]);

  useEffect(() => {
    if (!isVendor) return;
    vendorPortalService
      .getBookings("Pending")
      .then((list) => setPendingCount(list.length))
      .catch(() => {});
    Promise.all([vendorPortalService.getBookings("Accepted"), vendorPortalService.getBookings("Paid")])
      .then(([a, p]) => setConfirmedCount(a.length + p.length))
      .catch(() => {});
  }, [isVendor]);

  const handleUpdated = (updated: VendorBooking) => {
    setBookings((prev) => (prev ? prev.filter((b) => b.id !== updated.id) : prev));
    if (updated.status === "Accepted") setConfirmedCount((c) => c + 1);
    if (tab === "Pending") setPendingCount((c) => Math.max(0, c - 1));
  };

  if (authLoading || !isVendor) return null;

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#EDE0D2]">
      <VendorSidebar />

      <main className="min-w-0 flex-1 pb-24 md:pb-8">
        <BookingsTopBar />
        <BookingsHeader pendingCount={pendingCount} confirmedCount={confirmedCount} />
        <BookingsTabs active={tab} onChange={setTab} pendingCount={pendingCount} />

        <div className="px-4 pb-8 pt-5 md:px-8">
          {error ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm text-[#A3391C]">{error}</p>
              <button
                onClick={() => loadTab(tab)}
                className="text-sm font-semibold text-[#A3391C] hover:underline"
              >
                Try again
              </button>
            </div>
          ) : !bookings ? (
            <div className="flex items-center justify-center gap-2 py-16 text-[#8B7E72]">
              <Loader2 className="size-5 animate-spin" />
              Loading bookings…
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-[16px] border border-dashed border-[#DCCFC0] py-16 text-center text-[#8B7E72]">
              <p className="text-sm">No bookings in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {bookings.map((b) => (
                <BookingRequestCard key={b.id} booking={b} onUpdated={handleUpdated} />
              ))}
            </div>
          )}
        </div>
      </main>

      <VendorBottomNav />
    </div>
  );
}
