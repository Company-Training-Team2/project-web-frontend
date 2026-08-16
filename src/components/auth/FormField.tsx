import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  uppercase?: boolean;
  action?: ReactNode;
}

export default function FormField({
  id,
  label,
  error,
  children,
  uppercase = false,
  action,
}: FormFieldProps) {
  return (
    <div className="space-y-[9px]">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className={cn(
            "text-[12px] font-bold leading-none text-[#6d5d54]",
            uppercase ? "uppercase tracking-[0.08em]" : ""
          )}
        >
          {label}
        </Label>
        {action}
      </div>
      {children}
      {error ? <p className="text-[13px] font-medium text-[#b23a19]">{error}</p> : null}
    </div>
  );
}
