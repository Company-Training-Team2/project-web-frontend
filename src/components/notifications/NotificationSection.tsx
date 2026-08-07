import { NotificationItem } from "@/services/notifications.service";
import NotificationCard from "./NotificationCard";

export default function NotificationSection({
  label,
  notifications,
  onRead,
}: {
  label: string;
  notifications: NotificationItem[];
  onRead: (id: number) => void;
}) {
  if (notifications.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#a79a90]">{label}</p>
      <div className="space-y-2">
        {notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} onRead={onRead} />
        ))}
      </div>
    </div>
  );
}
