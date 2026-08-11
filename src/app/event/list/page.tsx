"use client";

import { useEffect, useMemo, useState } from "react";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import EventsTopBar from "@/components/client/events/EventsTopBar";
import EventsHeader from "@/components/client/events/EventsHeader";
import EventsSearchBar from "@/components/client/events/EventsSearchBar";
import EventCard from "@/components/client/events/EventCard";
import CreateEventFab from "@/components/client/events/CreateEventFab";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { eventService, EventSummary, EventDashboard } from "@/services/event.service";

export default function MyEventsPage() {
  useRequireAuth();

  const [events, setEvents] = useState<EventSummary[] | null>(null);
  const [dashboards, setDashboards] = useState<Record<number, EventDashboard>>({});
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [search, setSearch] = useState("");

  useEffect(() => {
    eventService
      .getMyEvents()
      .then(async (data) => {
        setEvents(data);
        setStatus("ready");
        // Best-effort — a dashboard fetch failing for one event just means
        // that card falls back to the plain totalBudget line.
        const entries = await Promise.all(
          data.map(async (e) => {
            try {
              return [e.id, await eventService.getDashboard(e.id)] as const;
            } catch {
              return null;
            }
          })
        );
        setDashboards(Object.fromEntries(entries.filter((e): e is [number, EventDashboard] => e !== null)));
      })
      .catch(() => setStatus("error"));
  }, []);

  const filtered = useMemo(() => {
    if (!events) return [];
    const q = search.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) => e.name.toLowerCase().includes(q) || e.city.toLowerCase().includes(q));
  }, [events, search]);

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8 relative">
      <EventsTopBar />
      <EventsHeader />
      <EventsSearchBar value={search} onChange={setSearch} />

      <div className="px-4 md:px-6 pt-6">
        {status === "loading" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
            ))}
          </div>
        ) : status === "error" ? (
          <p className="text-center text-sm text-[#8a3b3b] py-10">
            Couldn&apos;t load your events. Check your connection and reload.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-sm text-[#8B716A] py-10">
            {events && events.length > 0 ? "No events match your search." : "No events yet — create your first one below."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} dashboard={dashboards[e.id]} />
            ))}
          </div>
        )}
      </div>

      <CreateEventFab />
      <ClientBottomNav />
    </div>
  );
}
