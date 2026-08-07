import { Bell, CalendarCheck, CreditCard, MessageSquare, Shield, Star, Store } from "lucide-react";
import { NotificationItem, NotificationType } from "@/services/notifications.service";
import { cn } from "@/lib/utils";

const ICONS: Record<NotificationType, typeof Bell> = {
  BookingStatusUpdate: CalendarCheck,
  VendorMatch: Store,
  SecurityAlert: Shield,
  PaymentReceipt: CreditCard,
  NewReview: Star,
  Message: MessageSquare,
  SystemGeneral: Bell,
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationCard({
  notification,
  onRead,
}: {
  notification: NotificationItem;
  onRead: (id: number) => void;
}) {
  const Icon = ICONS[notification.type] ?? Bell;

  return (
    <button
      onClick={() => !notification.isRead && onRead(notification.id)}
      className={cn(
        "flex w-full items-start gap-3 rounded-[14px] border p-4 text-left transition",
        notification.isRead ? "border-[#e5ded2] bg-white" : "border-[#af3718]/30 bg-[#fdf0ec]"
      )}
    >
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#f3ede3] text-[#af3718]">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[14px] font-bold text-[#252323]">{notification.title}</p>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="text-[11px] text-[#a79a90]">{timeAgo(notification.createdAt)}</span>
            {!notification.isRead ? <span className="size-2 rounded-full bg-[#af3718]" /> : null}
          </div>
        </div>
        <p className="mt-1 text-[13px] leading-[1.4] text-[#6d5d54]">{notification.body}</p>
      </div>
    </button>
  );
}
