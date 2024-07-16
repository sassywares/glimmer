// src/modules/shared/providers/theme-provider.tsx
"use client";

import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// src/modules/shared/providers/theme-provider.tsx

// src/modules/shared/providers/theme-provider.tsx

// src/modules/shared/providers/theme-provider.tsx

// src/modules/shared/providers/theme-provider.tsx

// src/modules/shared/providers/theme-provider.tsx

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
