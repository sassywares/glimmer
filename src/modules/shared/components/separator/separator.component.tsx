"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/modules/shared/shared.utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      children,
      className,
      decorative = true,
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => {
    const separator = (
      <SeparatorPrimitive.Root
        ref={ref}
        role="separator"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className,
        )}
        {...props}
      />
    );

    if (children) {
      return (
        <div className="flex items-center">
          {separator}
          <div className="flex-shrink-0 px-2">{children}</div>
          {separator}
        </div>
      );
    }

    return separator;
  },
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
