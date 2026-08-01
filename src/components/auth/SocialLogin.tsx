"use client";

import { Button } from "@/components/ui/button";

export default function SocialLogin() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: "#D5CCBC" }} />
        <span className="text-xs" style={{ color: "#8A8070" }}>
          OR CONTINUE WITH
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#D5CCBC" }} />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 gap-2 font-medium"
          style={{
            backgroundColor: "transparent",
            borderColor: "#C5B9A8",
            color: "#1A1A1A",
          }}
          onClick={() => console.log("Apple login — connect when backend ready")}
        >
          {/* Apple icon */}
          <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.5 46.4 174.9 46.4 42.7 0 109.2-49 190.5-49 30.4 0 108.2 2.6 168 backward"/>
          </svg>
          APPLE
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1 gap-2 font-medium"
          style={{
            backgroundColor: "transparent",
            borderColor: "#C5B9A8",
            color: "#1A1A1A",
          }}
          onClick={() => console.log("Google login — connect when backend ready")}
        >
          {/* Google G icon */}
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
