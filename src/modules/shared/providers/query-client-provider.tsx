"use client";

import { defaultStaleTime } from "../shared.config";

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: defaultStaleTime,
    },
  },
});

export function QueryClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}
