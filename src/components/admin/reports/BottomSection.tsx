import VolumeChart from "./VolumeChart";
import ServicePerformance from "./ServicePerformance";

export default function BottomSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2 min-w-0">
        <VolumeChart />
      </div>

      <div className="min-w-0">
        <ServicePerformance />
      </div>
    </section>
  );
}