export default function TimelineHeader({ eventName }: { eventName: string }) {
  return (
    <div className="px-4 md:px-6 pt-6">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622]">Your Event Journey</h1>
      <p className="text-sm text-[#8B7E72] mt-1 max-w-md">{eventName} · milestone-by-milestone progress.</p>
    </div>
  );
}
