import * as React from "react";

import { Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/modules/shared/shared.utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        icon: "h-10 w-10",
        default: "h-10 px-4 py-2 [&>svg]:w-5 [&>svg]:h-5",
        sm: "h-9 rounded-md px-3 [&>svg]:w-4 [&>svg]:h-4",
        lg: "h-11 rounded-md px-8 [&>svg]:w-6 [&>svg]:h-6",
      },
      variant: {
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, variant, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ size, variant, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    loading?: boolean;
  }
>(({ children, loading = false, disabled = false, ...props }, ref) => (
  <Button ref={ref} {...props} disabled={disabled || loading}>
    <Loader2 className="animate-spin" />
    {children}
  </Button>
));
LoadingButton.displayName = "Loading Button";

export { Button, LoadingButton, buttonVariants };
