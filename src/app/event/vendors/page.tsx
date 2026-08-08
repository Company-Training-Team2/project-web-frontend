import ClientBottomNav from "@/components/layout/ClientBottomNav";
import VendorsTopBar from "@/components/client/vendors/VendorsTopBar";
import VendorsTabs from "@/components/client/vendors/VendorsTabs";
import BookedVendorCard, {
  BookedVendor,
} from "@/components/client/vendors/BookedVendorCard";
import PendingDecisionCard, {
  PendingVendor,
} from "@/components/client/vendors/PendingDecisionCard";
import AiSuggestedCard from "@/components/client/vendors/AiSuggestedCard";

const booked: BookedVendor[] = [
  {
    id: "1",
    name: "Bloom & Stem Artistry",
    category: "Floral Design",
    price: "$4,200",
    rating: "4.9",
  },
  {
    id: "2",
    name: "Palate & Plate Catering",
    category: "Catering",
    price: "$12,500",
    rating: "5.0",
  },
];

const pending: PendingVendor[] = [
  {
    id: "3",
    name: "The Grand Conservatory",
    category: "Venue",
    price: "TBD",
    responseNote: "2 Awaiting Response",
  },
];

export default function EventVendorsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <VendorsTopBar />
      <VendorsTabs />

      <div className="px-4 md:px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#2B2622]">Booked Vendors</h2>
          <span className="text-xs text-[#8B716A]">Total: {booked.length}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {booked.map((v) => (
            <BookedVendorCard key={v.id} vendor={v} />
          ))}
        </div>
      </div>

      <div className="px-4 md:px-6 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[#2B2622]">Pending Decisions</h2>
          <span className="text-xs text-[#8B716A]">
            {pending[0]?.responseNote}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pending.map((v) => (
            <PendingDecisionCard key={v.id} vendor={v} />
          ))}
        </div>
      </div>

      <div className="px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AiSuggestedCard />
        </div>
      </div>

      <ClientBottomNav />
    </div>
  );
}