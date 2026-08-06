import Sidebar from "@/components/layout/Sidebar";
import BrowseVendorsScreen from "@/components/vendor/BrowseVendorsScreen";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <BrowseVendorsScreen />
      </main>
    </div>
  );
}