"use client";

import { useEffect, useState } from "react";

import { Breakpoint } from "../types";

export function useMediaQuery(breakpoint: Breakpoint): boolean {
  const mediaQuery = window.matchMedia(
    `(min-width: ${Breakpoint[breakpoint]}px)`,
  );

  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", onChange);

    // Clean up
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [breakpoint, mediaQuery]);

  return matches;
}
