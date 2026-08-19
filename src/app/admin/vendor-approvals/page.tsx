import { redirect } from "next/navigation";

// This was a leftover, unguarded duplicate of the vendor-approval screen —
// hardcoded mock vendors ("Luxe Blooms Boutique", ...), no useRequireAdminAuth
// gate (reachable by anyone, logged in or not), and its own bottom nav linked
// to /admin/vendor-approvals/home|logs|profile, none of which exist. The real,
// API-backed, admin-gated screen is /admin/vendors (adminService.
// getPendingVendorsAdapted()) — same pattern as the /vendor/orders redirect.
export default function VendorApprovalsPage() {
  redirect("/admin/vendors");
}
