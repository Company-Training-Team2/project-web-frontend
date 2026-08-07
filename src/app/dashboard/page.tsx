import { redirect } from "next/navigation";

// Moved to /admin/dashboard so every admin page lives under /admin/*.
export default function LegacyDashboardRedirect() {
  redirect("/admin/dashboard");
}
