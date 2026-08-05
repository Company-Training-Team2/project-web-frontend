import { MockVendor } from "@/lib/mock/types";
import VendorCard from "./VendorCard";
import NoResultsFound from "./NoResultsFound";

export default function VendorList({ vendors }: { vendors: MockVendor[] }) {
  if (vendors.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <div className="space-y-3 px-5 pb-28 pt-1 lg:px-10">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} layout="list" />
      ))}
    </div>
  );
}
