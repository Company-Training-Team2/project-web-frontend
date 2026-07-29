import { typography } from "@/constants/typography";
import { cn } from "@/lib/utils";

type Variant = keyof typeof typography;

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  variant: Variant;
  as?: React.ElementType;
}

export function Typography({
  variant,
  as: Component = "p",
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typography[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}