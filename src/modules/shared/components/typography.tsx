import { cn } from "../shared.utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type Props<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

export type TypographyProps<T extends React.ElementType> = Props<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>> &
  VariantProps<typeof typographyVariants>;

const Typography = React.forwardRef(
  <T extends React.ElementType = "div">(
    { as, variant, className = "", children, ...rest }: TypographyProps<T>,
    ref: React.Ref<any>,
  ) => {
    const Component = as || "div";

    return (
      <Component
        ref={ref}
        {...rest}
        className={cn(typographyVariants({ variant, className }))}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

export { Typography };
