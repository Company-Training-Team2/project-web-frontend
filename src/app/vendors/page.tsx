import BrowseVendorsScreen from "@/components/vendor/BrowseVendorsScreen";

// Customer-facing Browse Vendors only — the admin equivalent ("Vendor
// Directory", the approval-queue screen) now lives at its own /admin/vendors
// route so the two stop sharing this URL.
export default function VendorsPage() {
  return <BrowseVendorsScreen />;
}
