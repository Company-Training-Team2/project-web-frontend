import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BOOKING_TABS = ["Upcoming", "Ongoing", "Completed", "Cancelled"] as const;
export type BookingTab = (typeof BOOKING_TABS)[number];

export default function BookingFilterTabs({
  active,
  onChange,
}: {
  active: BookingTab;
  onChange: (tab: BookingTab) => void;
}) {
  return (
    <Tabs value={active} onValueChange={(v) => onChange(v as BookingTab)} className="px-5 lg:px-10">
      <TabsList>
        {BOOKING_TABS.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
