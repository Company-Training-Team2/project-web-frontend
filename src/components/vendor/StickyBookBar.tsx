"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { messagingService } from "@/services/messaging.service";
import { notifyLoginRequired } from "@/lib/authToast";

export default function StickyBookBar({
  vendorId,
  packageId,
  price,
}: {
  vendorId: string;
  packageId: string | null;
  price: number;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isMessaging, setIsMessaging] = useState(false);

  // Real WorkPost ids are numeric; a mock fixture id ("v1"..) has no real
  // listing behind it to message a vendor about.
  const canMessage = /^\d+$/.test(vendorId);

  const handleMessage = async () => {
    if (!isAuthenticated) {
      notifyLoginRequired();
      router.push(`/login?redirect=/vendors/${vendorId}`);
      return;
    }
    setIsMessaging(true);
    try {
      const conversation = await messagingService.createConversation({ workPostId: Number(vendorId) });
      router.push(`/messages?c=${conversation.id}`);
    } catch {
      toast.error("Couldn't start a conversation with this vendor. Please try again.");
    } finally {
      setIsMessaging(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-20 flex items-center justify-between gap-3 border-t border-[#e5ded2] bg-white/95 px-5 py-4 backdrop-blur lg:px-10">
      <div>
        <p className="text-[11px] uppercase tracking-[0.06em] text-[#a79a90]">Starting from</p>
        <p className="text-[18px] font-bold text-[#252323]">EGP {price.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-2">
        {canMessage ? (
          <Button
            onClick={handleMessage}
            disabled={isMessaging}
            variant="outline"
            className="h-12 rounded-[10px] border-[#af3718] px-4 text-[#af3718] hover:bg-[#fdf0ec]"
            aria-label="Message vendor"
          >
            <MessageCircle className="size-4" />
          </Button>
        ) : null}
        <Button
          onClick={() =>
            router.push(`/booking/reserve?vendorId=${vendorId}${packageId ? `&packageId=${packageId}` : ""}`)
          }
          className="h-12 rounded-[10px] bg-[#af3718] px-8 hover:bg-[#9f3216]"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
