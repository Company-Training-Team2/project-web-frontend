import BookingDetailsScreen from "@/components/booking/BookingDetailsScreen";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BookingDetailsScreen bookingId={id} />;
}
