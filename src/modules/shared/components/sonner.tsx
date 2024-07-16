"use client";

import { useTheme } from "next-themes";

import { getServiceErrorMessage } from "../shared.types";

import { toast, Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          description: "group-[.toast]:text-muted-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
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
