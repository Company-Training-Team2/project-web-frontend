const ACTIONS = ["Show catering options", "Adjust guest count"];

export default function QuickActionPills({ onSelect }: { onSelect: (action: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 px-5 pb-2 lg:px-10">
      {ACTIONS.map((action) => (
        <button
          key={action}
          onClick={() => onSelect(action)}
          className="rounded-full border border-[#e5ded2] bg-white px-3.5 py-2 text-[13px] font-medium text-[#252323] transition hover:border-[#af3718]"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
