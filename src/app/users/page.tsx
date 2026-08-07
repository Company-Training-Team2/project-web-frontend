import { redirect } from "next/navigation";

// Moved to /admin/users so every admin page lives under /admin/*.
export default function LegacyUsersRedirect() {
  redirect("/admin/users");
}
