import { redirect } from "next/navigation";

// This was a leftover prototype screen — fully hardcoded numbers ($120,000
// budget, "75% Used", static category cards, a stock Pexels photo), no
// useRequireAuth gate (reachable by anyone, logged in or not), and it
// rendered <Sidebar /> — the *admin* executive-portal nav (see Sidebar.tsx's
// menu, all /admin/* routes) — on what's supposed to be a customer page.
// Nothing in the app links here. The real, API-backed, auth-gated budget
// screen (GET /api/expenses/{eventId}/budget via expenseService.getBudget)
// is /event/budget — same redirect pattern as /admin/vendor-approvals.
export default function BudgetPage() {
  redirect("/event/budget");
}
