import ClientBottomNav from "@/components/layout/ClientBottomNav";
import EventsTopBar from "@/components/client/events/EventsTopBar";
import EventsHeader from "@/components/client/events/EventsHeader";
import EventsSearchBar from "@/components/client/events/EventsSearchBar";
import EventCard, { EventItem } from "@/components/client/events/EventCard";
import CreateEventFab from "@/components/client/events/CreateEventFab";

const events: EventItem[] = [
  {
    id: "1",
    tag: "Wedding",
    rating: "4.9",
    name: "Eleanor & Julian's Gala",
    date: "June 14, 2024",
    guests: 180,
    progress: 75,
    spent: "$12,400",
    budget: "$25,000",
  },
  {
    id: "2",
    tag: "Corporate Launch",
    rating: "4.7",
    name: "Aria Tech Summit",
    date: "August 22, 2024",
    guests: 450,
    progress: 32,
    spent: "$45,000",
    budget: "$150,000",
  },
  {
    id: "3",
    tag: "Private Dinner",
    rating: "5.0",
    name: "The Golden Jubilee",
    date: "Sept 05, 2024",
    guests: 24,
    progress: 90,
    spent: "$7,080",
    budget: "$8,000",
  },
];

export default function MyEventsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8 relative">
      <EventsTopBar />
      <EventsHeader />
      <EventsSearchBar />

      <div className="px-4 md:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </div>

      <CreateEventFab />
      <ClientBottomNav />
    </div>
  );
}