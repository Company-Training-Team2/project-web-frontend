export default function TaskVelocityCard() {
  const completed = 32;
  const total = 48;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#2B2622]">Task Velocity</h2>
        <span className="text-sm text-[#8B716A]">
          {completed} Completed / {total} Total
        </span>
      </div>

      <div className="w-full bg-[#EDE0D2] rounded-full h-2 mt-4">
        <div
          className="bg-[#A3391C] h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-xs text-[#8B716A] mt-3">
        Next task: Finalize floral selection with &apos;Petal &amp;
        Stem&apos;
      </p>
    </div>
  );
}