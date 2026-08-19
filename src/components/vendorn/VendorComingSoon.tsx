import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";

// Placeholder for vendor-portal pages that don't have their real screen
// built yet (see /vendor/calendar and /vendor/services for the real ones).
// These route files existed with no default export, which broke `next
// build` for the entire app — this keeps the route valid and honest about
// its state instead of 500ing or silently doing nothing.
export default function VendorComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex flex-1 min-w-0 flex-col items-center justify-center p-6 pb-24 text-center md:pb-6">
        <h1 className="font-serif text-2xl font-bold text-[#2B2622]">{title}</h1>
        <p className="mt-2 max-w-sm text-sm text-[#8B7E72]">
          This screen isn&apos;t built yet — check back soon.
        </p>
      </main>

      <VendorBottomNav />
    </div>
  );
}
