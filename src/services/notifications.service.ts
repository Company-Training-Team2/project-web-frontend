// Real, callable endpoints — NotificationsController exists and is wired
// here for real (no mock fallback data file for this one; if the request
// fails the page just shows an empty/error state, since a stale notification
// feed would be actively misleading).
import apiClient from "@/lib/axios";

export type NotificationType =
  | "BookingStatusUpdate"
  | "VendorMatch"
  | "SecurityAlert"
  | "PaymentReceipt"
  | "NewReview"
  | "Message"
  | "SystemGeneral";

// Backend serializes the C# enum as its underlying number by default.
const NOTIFICATION_TYPE_BY_VALUE: Record<number, NotificationType> = {
  1: "BookingStatusUpdate",
  2: "VendorMatch",
  3: "SecurityAlert",
  4: "PaymentReceipt",
  5: "NewReview",
  6: "Message",
  7: "SystemGeneral",
};

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  relatedEntityId?: number;
  createdAt: string;
}

export interface NotificationFeed {
  today: NotificationItem[];
  yesterday: NotificationItem[];
  earlier: NotificationItem[];
  unreadCount: number;
}

interface BackendNotificationDto {
  id: number;
  type: number | NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  relatedEntityId?: number;
  createdAt: string;
}

interface BackendNotificationFeedDto {
  today: BackendNotificationDto[];
  yesterday: BackendNotificationDto[];
  earlier: BackendNotificationDto[];
  unreadCount: number;
}

function toNotificationItem(dto: BackendNotificationDto): NotificationItem {
  return {
    id: dto.id,
    type: typeof dto.type === "number" ? NOTIFICATION_TYPE_BY_VALUE[dto.type] ?? "SystemGeneral" : dto.type,
    title: dto.title,
    body: dto.body,
    isRead: dto.isRead,
    relatedEntityId: dto.relatedEntityId,
    createdAt: dto.createdAt,
  };
}

export const notificationsService = {
  async getFeed(): Promise<NotificationFeed> {
    const { data } = await apiClient.get<BackendNotificationFeedDto>("/notifications");
    return {
      today: data.today.map(toNotificationItem),
      yesterday: data.yesterday.map(toNotificationItem),
      earlier: data.earlier.map(toNotificationItem),
      unreadCount: data.unreadCount,
    };
  },

  async markAsRead(id: number): Promise<NotificationItem> {
    const { data } = await apiClient.patch<BackendNotificationDto>(`/notifications/${id}/read`);
    return toNotificationItem(data);
  },
};
