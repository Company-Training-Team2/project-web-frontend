"use client";

import { Button } from "@/components/ui/button";
import Divider from "./Divider";

export default function SocialLogin({ label = "OR CONTINUE WITH" }: { label?: string }) {
  return (
    <div className="space-y-3">
      <Divider label={label} />

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-[52px] w-[124px] rounded-[24px] border-[#c55435] bg-transparent text-[15px] font-medium tracking-[0.08em] text-[#5e7668] hover:bg-[#f5eee6]"
        >
          <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.5 46.4 174.9 46.4 42.7 0 109.2-49 190.5-49 30.4 0 108.2 2.6 168.6 79.3-4.2 2.6-14.1 8.4-14.1 8.4zM590 0c14 95.5-80.2 190.2-165.1 186.2C412.2 94.8 500.4 5.3 590 0z" />
          </svg>
          APPLE
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-[52px] w-[124px] rounded-[24px] border-[#c55435] bg-transparent text-[15px] font-medium tracking-[0.08em] text-[#5e7668] hover:bg-[#f5eee6]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          GOOGLE
        </Button>
      </div>
    </div>
  );
}
