"use client";

import { useEffect, useRef, useState } from "react";
import { defaultDebounceDelay } from "../shared.config";

/**
 * A hook that returns a debounced version of the provided state.
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 */
export function useDebouncedState<T>(value: T, delay = defaultDebounceDelay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
