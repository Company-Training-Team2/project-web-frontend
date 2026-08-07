import { redirect } from "next/navigation";

// Moved to /admin/analytics so every admin page lives under /admin/*.
export default function LegacyAnalyticsRedirect() {
  redirect("/admin/analytics");
}
