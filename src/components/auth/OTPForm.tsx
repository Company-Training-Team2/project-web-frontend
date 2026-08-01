"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 44;

export default function OTPForm() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleResend = () => {
    setCountdown(COUNTDOWN_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    toast.info("New code sent to your email.");
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: await authService.verifyOtp({ code })
      await new Promise((res) => setTimeout(res, 800));
      toast.success("Identity verified!");
      router.push("/reset-password");
    } catch {
      toast.error("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero image placeholder matching Figma */}
      <div
        className="w-full h-36 rounded-2xl overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#E8E0D0" }}
      >
        <div className="text-center space-y-1">
          <div
            className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center"
            style={{ backgroundColor: "#C1502E" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="white"/>
            </svg>
          </div>
          <p className="text-xs" style={{ color: "#8A8070" }}>Verification Code</p>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center space-y-2">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#1A1A1A", fontFamily: "var(--font-heading)" }}
        >
          Verify Identity
        </h1>
        <p className="text-sm" style={{ color: "#6B6B68" }}>
          We&apos;ve sent a 6-digit code to your registered email address.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all"
            style={{
              backgroundColor: "white",
              borderColor: digit ? "#C1502E" : "#D5CCBC",
              color: "#1A1A1A",
              caretColor: "#C1502E",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "#C1502E")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = digit ? "#C1502E" : "#D5CCBC")
            }
          />
        ))}
      </div>

      {/* Resend */}
      <div className="text-center space-y-1">
        {!canResend ? (
          <p className="text-sm font-semibold" style={{ color: "#C1502E" }}>
            Resend in {formatTime(countdown)}
          </p>
        ) : null}
        <p className="text-sm" style={{ color: "#6B6B68" }}>
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend}
            className="font-semibold hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "#C1502E" }}
          >
            Resend
          </button>
        </p>
      </div>

      {/* Verify button */}
      <Button
        onClick={handleVerify}
        className="w-full font-bold h-12 text-base rounded-xl tracking-widest"
        disabled={isLoading}
        style={{ backgroundColor: "#C1502E", color: "white" }}
      >
        {isLoading ? (
          <><Loader2 size={18} className="mr-2 animate-spin" /> Verifying...</>
        ) : (
          "VERIFY"
        )}
      </Button>
    </div>
  );
}
