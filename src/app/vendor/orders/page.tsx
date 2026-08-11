import { redirect } from "next/navigation";

// Legacy path — the sidebar's "Bookings" link (and the Figma frame it's
// named after, "Booking Requests") both point at /vendor/bookings now,
// where the real screen lives. This stays as a permanent redirect so any
// old links/bookmarks to /vendor/orders still land somewhere real, same
// pattern as the /dashboard -> /admin/dashboard redirects.
export default function VendorOrdersPage() {
  redirect("/vendor/bookings");
}
