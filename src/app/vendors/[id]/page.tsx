import VendorDetailsScreen from "@/components/vendor/VendorDetailsScreen";

export default async function VendorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VendorDetailsScreen vendorId={id} />;
}
