"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "./button.component";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/modules/shared/shared.utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      showOutsideDays={showOutsideDays}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      classNames={{
        head_row: "flex",
        month: "space-y-4",
        row: "flex w-full mt-2",
        day_hidden: "invisible",
        day_range_end: "day-range-end",
        nav: "space-x-1 flex items-center",
        nav_button_next: "absolute right-1",
        caption_label: "text-sm font-medium",
        nav_button_previous: "absolute left-1",
        table: "w-full border-collapse space-y-1",
        day_today: "bg-accent text-accent-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        caption: "flex justify-center pt-1 relative items-center",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };