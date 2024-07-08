"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { getServiceErrorMessage } from "../shared.types";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

type PromiseToastOptions = Parameters<typeof toast.promise>["1"];

const defaultPromiseToastOptions: PromiseToastOptions = {
  loading: "Loading...",
  success: "Action completed successfully",
  error: (error) => getServiceErrorMessage(error) || "Something went wrong",
};

export { Toaster, type PromiseToastOptions, defaultPromiseToastOptions };
