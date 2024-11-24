import { ComponentPropsWithAsChild } from "@/types";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva("", {
  variants: {
    align: {
      left: "text-left",
      right: "text-right",
      center: "text-center",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive-foreground",
      muted: "text-muted-foreground",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7",
      blockquote: "border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
    truncate: {
      true: "truncate",
    },
    transform: {
      none: "normal-case",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
  },
  defaultVariants: {
    align: "left",
    color: "default",
    weight: "normal",
    variant: "p",
    truncate: false,
    transform: "none",
  },
});

export type TextProps = ComponentPropsWithAsChild<
  "p",
  VariantProps<typeof textVariants>
>;

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
