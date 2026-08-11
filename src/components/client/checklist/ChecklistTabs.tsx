"use client";

export type ChecklistTab = "All Tasks" | "High Priority" | "Vendor Follow-ups";

const tabs: ChecklistTab[] = ["All Tasks", "High Priority", "Vendor Follow-ups"];

export default function ChecklistTabs({
  active,
  onChange,
}: {
  active: ChecklistTab;
  onChange: (tab: ChecklistTab) => void;
}) {
  return (
    <div className="flex items-center gap-2 px-4 md:px-6 pt-5 overflow-x-auto no-scrollbar">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition
            ${active === t ? "bg-[#A3391C] text-white" : "bg-[#F6ECE0] border border-[#DCCFC0] text-[#2B2622] hover:bg-[#EDE0D2]"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
