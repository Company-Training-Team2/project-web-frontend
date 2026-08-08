import VendorSidebar from "@/components/layout/VendorSidebar";
import OrdersTopBar from "@/components/vendorn/orders/OrdersTopBar";
import OrdersTabs from "@/components/vendorn/orders/OrdersTabs";
import BookingRequestsList from "@/components/vendorn/orders/BookingRequestsList";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";

export default function VendorOrdersPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <div className="hidden md:block">
        <VendorSidebar />
      </div>

      <div className="flex-1 min-w-0 relative">
        <OrdersTopBar />
        <OrdersTabs />
        <BookingRequestsList />
        <VendorBottomNav />
      </div>
    </div>
  );
}