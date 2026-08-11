// MOCK/DEMO DATA — the vendor portal has no messaging backend at all (no
// Conversation/Message controller or tables exist anywhere in the API).
// This is a scripted, hardcoded preview of what an inbox would look like —
// same "clearly-labeled scripted demo" approach as the AI Planner's fallback
// script (src/lib/mock/aiPlannerScript.ts), except here there is no real
// backend behind it to fall back FROM. Nothing sent here is persisted or
// delivered anywhere.

export interface MockChatMessage {
  id: string;
  sender: "vendor" | "client";
  text?: string;
  attachment?: { name: string; meta: string };
  time: string;
}

export interface MockConversation {
  id: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  avatarInitial: string;
  lastMessagePreview: string;
  lastMessageTime: string;
  unread: boolean;
  bookingReference: string;
  bookingDateTime: string;
  location: string;
  guestCount: string;
  package: {
    name: string;
    price: string;
    description: string;
    depositPaid: string;
    depositRemaining: string;
    percentPaid: number;
  };
  sharedFiles: { name: string; meta: string }[];
  timeline: { title: string; status: "completed" | "upcoming" | "planned"; note: string }[];
  messages: MockChatMessage[];
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: "amara",
    clientName: "Amara Okonkwo",
    eventType: "Luxury Wedding Planning",
    eventDate: "May 24th, 2025",
    avatarInitial: "A",
    lastMessagePreview: "The mood board looks incredible! We're leaning towards…",
    lastMessageTime: "10:24 AM",
    unread: true,
    bookingReference: "#EHB-9021",
    bookingDateTime: "May 24, 2025 · 4:00 PM",
    location: "The Heritage Ballroom, London",
    guestCount: "180 Guests (Confirmed)",
    package: {
      name: "Signature Banquet",
      price: "£18,500",
      description: "Includes 5-course curated menu, full floral production, and dedicated concierge.",
      depositPaid: "£6,475",
      depositRemaining: "£12,025 remaining",
      percentPaid: 35,
    },
    sharedFiles: [
      { name: "Mood Board v2", meta: "Image" },
      { name: "Seating Chart", meta: "Image" },
    ],
    timeline: [
      { title: "Initial Consultation", status: "completed", note: "Completed · Jan 15" },
      { title: "Venue Contract Signed", status: "completed", note: "Completed · Feb 02" },
      { title: "Catering Tasting", status: "upcoming", note: "Upcoming · Mar 25" },
      { title: "Final Production Walkthrough", status: "planned", note: "Planned · Apr 12" },
    ],
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Good morning, team! We've been looking at the floral arrangements you sent over. We absolutely love the palette, but were wondering if we could introduce a bit more deep terracotta to match the velvet drapes in the ballroom?",
        time: "09:12 AM",
      },
      {
        id: "m2",
        sender: "vendor",
        text: "Hello Amara! That is an excellent suggestion. The terracotta will create a wonderful bridge between the florals and the venue's architecture. I'll update the mood board and share it here shortly.",
        time: "09:45 AM",
      },
      {
        id: "m3",
        sender: "client",
        text: "That sounds perfect. Also, we just finalized the guest list for the rehearsal dinner. Attached it here!",
        attachment: { name: "Guest_List_Rehearsal.xlsx", meta: "42 KB · Excel Document" },
        time: "10:24 AM",
      },
    ],
  },
  {
    id: "julian",
    clientName: "Julian Ross",
    eventType: "Gala · Oct 2024",
    eventDate: "Oct 18th, 2024",
    avatarInitial: "J",
    lastMessagePreview: "Can you confirm the final guest count by Monday?",
    lastMessageTime: "Yesterday",
    unread: false,
    bookingReference: "#EHB-8744",
    bookingDateTime: "Oct 18, 2024 · 7:00 PM",
    location: "Goldman & Co. Private Events, Manhattan",
    guestCount: "120 Guests (Pending)",
    package: {
      name: "Corporate Executive Suite",
      price: "£4,200",
      description: "Annual gala catering with 5-course dining and valet service.",
      depositPaid: "£1,050",
      depositRemaining: "£3,150 remaining",
      percentPaid: 25,
    },
    sharedFiles: [{ name: "Floor Plan", meta: "PDF" }],
    timeline: [
      { title: "Initial Consultation", status: "completed", note: "Completed · Sep 02" },
      { title: "Menu Tasting", status: "upcoming", note: "Upcoming · Oct 10" },
    ],
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Can you confirm the final guest count by Monday? We're finalizing catering orders on our end.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "elena",
    clientName: "Elena Vance",
    eventType: "Graduation Soirée",
    eventDate: "Mar 12th, 2025",
    avatarInitial: "E",
    lastMessagePreview: "I've attached the dietary requirements for our guests.",
    lastMessageTime: "Mar 12",
    unread: false,
    bookingReference: "#EHB-8391",
    bookingDateTime: "Mar 12, 2025 · 6:00 PM",
    location: "Riverside Terrace, Cairo",
    guestCount: "60 Guests (Confirmed)",
    package: {
      name: "Garden Soirée",
      price: "£3,100",
      description: "Buffet-style catering with garden seating and live acoustic set.",
      depositPaid: "£3,100",
      depositRemaining: "Paid in full",
      percentPaid: 100,
    },
    sharedFiles: [{ name: "Dietary_Requirements.pdf", meta: "18 KB · PDF" }],
    timeline: [
      { title: "Initial Consultation", status: "completed", note: "Completed · Feb 01" },
      { title: "Final Walkthrough", status: "completed", note: "Completed · Mar 10" },
    ],
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "I've attached the dietary requirements for our guests.",
        attachment: { name: "Dietary_Requirements.pdf", meta: "18 KB · PDF Document" },
        time: "Mar 12",
      },
    ],
  },
];

export const QUICK_REPLY_ACTIONS = ["Send Invoice", "Update Mood Board", "Schedule Call", "Confirm Guest Count"];
