import HomePage from "@/components/home/homePage";

// Guests can browse the whole marketplace without an account — this is the
// public landing page, not a login wall. Login/registration are reachable
// from the header, and an account is only required at the two points the
// product actually needs one: sending a message to the AI Planner, and
// confirming a real booking (see useRequireAuth usage in those screens).
export default function Home() {
  return <HomePage />;
}
