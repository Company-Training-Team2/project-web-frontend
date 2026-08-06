"use client";

import Link from "next/link";
import { 
  ChevronLeft, Search, Calendar, Heart, 
  Info, CreditCard, Star, MessageSquare, MoreHorizontal 
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

// --- Mock Data (بيانات الإشعارات حسب الصورة) ---
const notifications = {
  today: [
    {
      id: 1,
      icon: Calendar,
      title: "Booking Confirmed",
      description: "Your booking with The Grand Conservatory has been successfully accepted for October 12th.",
      time: "2h ago",
      isNew: true,
      iconBg: "bg-[#EBE5DB]",
      iconColor: "text-[#A3391C]",
    },
    {
      id: 2,
      icon: Heart,
      title: "New Favorite Match",
      description: 'A new vendor "Artisan Floral Studio" matches your saved wedding moodboard preferences.',
      time: "4h ago",
      isNew: true,
      iconBg: "bg-[#F5F0EB]",
      iconColor: "text-[#A3391C]",
    },
  ],
  yesterday: [
    {
      id: 3,
      icon: Info,
      title: "Security Update",
      description: "Your account was successfully accessed from a new device in London, UK.",
      time: "1d ago",
      isNew: false,
      iconBg: "bg-[#F5F0EB]",
      iconColor: "text-[#5A524A]",
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Payment Received",
      description: "Deposit for 'Elegance Photography' has been processed. View your updated budget tracker.",
      time: "1d ago",
      isNew: false,
      iconBg: "bg-[#F5F0EB]",
      iconColor: "text-[#A3391C]",
    },
  ],
  earlier: [
    {
      id: 5,
      icon: Star,
      title: "Review Reminder",
      description: "How was your experience with 'Vintage Catering'? Sharing a review helps other planners in our community.",
      time: "3d ago",
      isNew: false,
      iconBg: "bg-[#F5F0EB]",
      iconColor: "text-[#5A524A]",
    },
    {
      id: 6,
      type: "message", // نوع خاص للإشعارات اللي فيها صورة شخص
      image: "https://i.pravatar.cc/100?img=5",
      title: "Message from Sarah",
      description: '"Hi there! Just checking in to see if you have any questions about the summer gala menu..."',
      time: "5d ago",
      isNew: false,
      actionLink: "Reply now",
    },
  ],
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#FBF3EA] flex overflow-x-hidden">
      {/* Sidebar بتاعك */}
      <Sidebar />

      {/* Main Content Area (Website Layout) */}
      <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden">
        <div className="mx-auto w-full max-w-3xl">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between border-b border-[#E3DCD2] pb-5">
            <div className="flex items-center gap-4">
              <Link 
      href="/home" 
      className="flex items-center justify-center rounded-full border border-[#DCCFC0] bg-white p-2 text-[#2B2622] hover:bg-[#F5EDE0] transition shadow-sm w-10 h-10"
    >
      <ChevronLeft className="h-5 w-5" />
    </Link>
              <h1 className="font-serif text-3xl font-bold text-[#A3391C]">Notifications</h1>
            </div>
            
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7E72]" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="w-full rounded-full border border-[#DCCFC0] bg-white py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#8B7E72] focus:border-[#A3391C] focus:ring-1 focus:ring-[#A3391C]"
              />
            </div>
          </div>

          {/* --- Today Section --- */}
          <div className="mb-10">
            <h2 className="mb-4 text-sm font-medium text-[#5A524A]">Today</h2>
            <div className="space-y-3">
              {notifications.today.map((item) => (
                <NotificationCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* --- Yesterday Section --- */}
          <div className="mb-10">
            <h2 className="mb-4 text-sm font-medium text-[#5A524A]">Yesterday</h2>
            <div className="space-y-3">
              {notifications.yesterday.map((item) => (
                <NotificationCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* --- Earlier Section --- */}
          <div className="mb-10">
            <h2 className="mb-4 text-sm font-medium text-[#5A524A]">Earlier</h2>
            <div className="space-y-3">
              {notifications.earlier.map((item) => (
                <NotificationCard key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- Component لعرض بطاقة الإشعار الواحد ---
function NotificationCard({ item }: { item: any }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm border border-[#F0EAE2] transition hover:shadow-md">
      
      {/* الأيقونة أو الصورة */}
      <div className="mt-1 shrink-0">
        {item.type === "message" ? (
          <img 
            src={item.image} 
            alt="User" 
            className="h-10 w-10 rounded-full object-cover border border-[#E3DCD2]" 
          />
        ) : (
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}>
            <item.icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* المحتوى */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-[#1A1A1A]">{item.title}</p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-[#8B7E72]">{item.time}</span>
            {item.isNew && (
              <span className="h-2 w-2 rounded-full bg-[#A3391C]" />
            )}
          </div>
        </div>
        
        <p className="mt-1 text-sm leading-relaxed text-[#5A524A]">
          {item.description}
        </p>
        
        {/* لو فيه رابط للإجراء (مثل Reply now) */}
        {item.actionLink && (
          <Link href="#" className="mt-2 inline-block text-xs font-semibold text-[#A3391C] hover:underline">
            {item.actionLink}
          </Link>
        )}
      </div>

      {/* زر المزيد (ثلاث نقاط) */}
      <button className="mt-1 shrink-0 text-[#8B7E72] hover:text-[#1A1A1A]">
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}