"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { eventService, EventType } from "@/services/event.service";

const EVENT_TYPES: EventType[] = ["Wedding", "Birthday", "Corporate", "Conference", "Party", "Graduation", "Other"];

export default function CreateEventPage() {
  useRequireAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [eventType, setEventType] = useState<EventType>("Wedding");
  const [targetDate, setTargetDate] = useState("");
  const [guestCount, setGuestCount] = useState(50);
  const [totalBudget, setTotalBudget] = useState(10000);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = name.trim() && targetDate && city.trim() && location.trim();

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      const event = await eventService.createEvent({
        name: name.trim(),
        eventType,
        targetDate: new Date(targetDate).toISOString(),
        guestCount,
        totalBudget,
        city: city.trim(),
        location: location.trim(),
        notes: notes.trim() || undefined,
      });
      toast.success("Event created.");
      router.push(`/event/dashboard?id=${event.id}`);
    } catch {
      toast.error("Couldn't create the event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <div className="flex items-center gap-3 px-4 md:px-6 py-4 bg-[#F6ECE0] border-b border-[#DCCFC0]">
        <button onClick={() => router.back()} className="text-[#A3391C]">
          <ChevronLeft size={22} />
        </button>
        <span className="font-serif text-lg md:text-xl font-bold text-[#A3391C]">New Event</span>
      </div>

      <div className="mx-auto max-w-xl px-4 md:px-6 pt-6 space-y-4">
        <div>
          <label className="text-sm text-[#2B2622]">Event Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Eleanor & Julian's Wedding"
            className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-[#2B2622]">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-[#2B2622]">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-[#2B2622]">Guest Count</label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>
          <div>
            <label className="text-sm text-[#2B2622]">Total Budget (EGP)</label>
            <input
              type="number"
              min={0}
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-[#2B2622]">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Cairo"
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>
          <div>
            <label className="text-sm text-[#2B2622]">Venue / Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Grand Plaza Ballroom"
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-[#2B2622]">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 py-2 text-sm outline-none focus:border-[#A3391C]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full rounded-xl bg-[#A3391C] py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Creating…" : "Create Event"}
        </button>
      </div>
    </div>
  );
}
