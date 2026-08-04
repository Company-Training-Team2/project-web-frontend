import VolumeChart from "./VolumeChart";
import ServicePerformance from "./ServicePerformance";

export default function BottomSection() {
  return (
    <section className="grid grid-cols-3 gap-6 mt-6">
      <div className="col-span-2">
        <VolumeChart />
      </div>

      <ServicePerformance />
    </section>
  );
}