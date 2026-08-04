"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
}

export default function OTPInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  error = false,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  const updateDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit.replace(/\D/g, "").slice(-1);
    onChange(next.join(""));

    if (next[index] && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    const pasted = text.replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={(event) => {
      event.preventDefault();
      handlePaste(event.clipboardData.getData("text"));
    }}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          aria-label={`Verification code digit ${index + 1}`}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(event) => updateDigit(index, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digit && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          className={cn(
            "h-[52px] w-[44px] rounded-[4px] border bg-white text-center text-xl font-medium text-[#1a1a1a] outline-none transition focus:border-[#b23a19] focus:ring-2 focus:ring-[#b23a19]/15 disabled:opacity-60",
            error ? "border-[#b23a19]" : digit ? "border-[#b23a19]" : "border-[#8c736b]"
          )}
        />
      ))}
    </div>
  );
}
