// MOCK/DEMO DATA — a hardcoded, scripted conversation standing in for a
// future real AI Planner backend. No live LLM call is made anywhere in this
// feature; replies are pre-authored and selected from this fixture array by
// simple keyword/index matching against the quick-action pills, not a model.

export interface PlannerMessage {
  id: string;
  role: "user" | "assistant";
  kind: "text" | "budgetHealth" | "recommendation" | "quote" | "eventCard";
  text?: string;
  budget?: { amount: string; status: string; percent: number; caption: string };
  recommendation?: { name: string; location: string; estimate: string; rating: number; image: string };
  eventCard?: { date: string; title: string; subtitle: string; ctaLabel: string };
}

export const MOCK_PLANNER_CONVERSATION: PlannerMessage[] = [
  {
    id: "m1",
    role: "user",
    kind: "text",
    text: "We're looking to finalize the budget around £45,000. How does that impact our venue options in Florence?",
  },
  {
    id: "m2",
    role: "assistant",
    kind: "text",
    text: "With a refined budget of £45,000, we're in an excellent position. This allows us to secure premium historic venues while maintaining quality catering. I've adjusted the allocation and curated a few highly-rated estates that fit this profile.",
  },
  {
    id: "m3",
    role: "assistant",
    kind: "budgetHealth",
    budget: { amount: "£45,000", status: "Optimal Range", percent: 65, caption: "Venue & Catering est. taking 65%" },
  },
  {
    id: "m4",
    role: "assistant",
    kind: "recommendation",
    recommendation: {
      name: "Villa Gamberaia",
      location: "Settignano, Florence",
      estimate: "Est. £18,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "m5",
    role: "assistant",
    kind: "quote",
    text: "Villa Gamberaia perfectly balances your desire for historic architecture with the updated budget. It offers exceptional views without the premium 'central Florence' markup.",
  },
  {
    id: "m6",
    role: "assistant",
    kind: "eventCard",
    eventCard: { date: "OCT 12", title: "Venue Tours", subtitle: "3 viewings scheduled", ctaLabel: "View" },
  },
];

/** Canned follow-up replies keyed by quick-action pill label — appended to
 * the thread when a pill is clicked, purely for demo purposes. */
export const QUICK_ACTION_REPLIES: Record<string, string> = {
  "Show catering options":
    "Here are three catering partners who work well within a £45,000 all-in budget — I'll prioritize ones with strong reviews for estate-style service.",
  "Adjust guest count":
    "Sure — tell me your updated guest count and I'll recalculate the per-guest catering and venue capacity fit.",
};
