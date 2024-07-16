"use client";

import { useRef, useEffect, useCallback } from "react";

import { defaultDebounceDelay } from "../shared.config";

type CallbackFunction = (...args: any[]) => void;

/**
 * A hook that returns a debounced version of the provided function.
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 */
export function useDebouncedFn(
  fn: CallbackFunction,
  delay = defaultDebounceDelay,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const debouncedFn = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}
