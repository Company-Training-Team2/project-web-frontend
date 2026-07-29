import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--primary-600)]",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[var(--secondary-600)]",

        outline:
          "border-border bg-background text-foreground hover:bg-muted",

        ghost:
          "text-foreground hover:bg-muted",

        destructive:
          "bg-destructive text-white hover:opacity-90",

        success:
          "bg-[var(--success)] text-white hover:brightness-95",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default:
          "h-10 gap-2 px-4",

        xs:
          "h-7 rounded-md px-2 text-xs",

        sm:
          "h-9 rounded-md px-3 text-sm",

        lg:
          "h-11 rounded-lg px-6 text-base",

        icon:
          "size-10",

        "icon-xs":
          "size-7 rounded-md",

        "icon-sm":
          "size-9 rounded-md",

        "icon-lg":
          "size-11 rounded-lg",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }