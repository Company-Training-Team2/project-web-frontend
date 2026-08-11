"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { eventService, EventVendor } from "@/services/event.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import EventVendorCard from "@/components/client/vendors/EventVendorCard";
import VendorsTabs, { VendorTab } from "@/components/client/vendors/VendorsTabs";
import VendorsTopBar from "@/components/client/vendors/VendorsTopBar";

const BOOKED_STATUSES = ["Confirmed", "Completed"];
const PENDING_STATUSES = ["Pending"];

function VendorsInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();
  const [vendors, setVendors] = useState<EventVendor[] | null>(null);
  const [vendorStatus, setVendorStatus] = useState<"loading" | "error" | "ready">("loading");
  const [tab, setTab] = useState<VendorTab>("All Vendors");

  useEffect(() => {
    if (!event) return;
    setVendorStatus("loading");
    eventService
      .getVendors(event.id)
      .then((data) => {
        setVendors(data);
        setVendorStatus("ready");
      })
      .catch(() => setVendorStatus("error"));
  }, [event]);

  const bookedCount = vendors?.filter((v) => BOOKED_STATUSES.includes(v.bookingStatus)).length ?? 0;
  const pendingCount = vendors?.filter((v) => PENDING_STATUSES.includes(v.bookingStatus)).length ?? 0;

  const filtered = useMemo(() => {
    if (!vendors) return [];
    if (tab === "Booked") return vendors.filter((v) => BOOKED_STATUSES.includes(v.bookingStatus));
    if (tab === "Pending") return vendors.filter((v) => PENDING_STATUSES.includes(v.bookingStatus));
    return vendors;
  }, [vendors, tab]);

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <VendorsTopBar />
      <VendorsTabs eventName={event.name} bookedCount={bookedCount} pendingCount={pendingCount} active={tab} onChange={setTab} />

      <div className="px-4 md:px-6 pt-6">
        {vendorStatus === "error" ? (
          <p className="text-center text-sm text-[#8a3b3b] py-10">Couldn&apos;t load vendors for this event.</p>
        ) : vendorStatus === "loading" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-[#8B716A]">No vendors booked for this event yet.</p>
            <Link href="/vendors/search" className="inline-block mt-3 text-sm font-medium text-[#A3391C] hover:underline">
              Browse Vendors →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((v) => (
              <EventVendorCard key={v.bookingId} vendor={v} />
            ))}
          </div>
        )}
      </div>

      <ClientBottomNav />
    </div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <VendorsInner />
    </Suspense>
  );
}
