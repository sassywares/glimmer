// src/modules/shared/providers/query-client-provider.tsx
"use client";

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";
import { defaultStaleTime } from "../shared.config";

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

// src/modules/shared/providers/query-client-provider.tsx

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
