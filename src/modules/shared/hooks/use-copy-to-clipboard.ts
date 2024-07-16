import { useState, useCallback } from "react";

import { oldSchoolCopy } from "../shared.utils";

/**
 * Courtesy of {@link https://usehooks.com/useclipboard}
 *
 * @returns A tuple containing the copied value and a function to copy a value to the clipboard
 *
 * @example
 * const [copied, copyToClipboard] = useCopyToClipboard();
 */
export function useCopyToClipboard() {
  const [state, setState] = useState<string>();

  const copyToClipboard = useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          setState(value);
        } else {
          throw new Error("writeText not supported");
        }
      } catch (e) {
        oldSchoolCopy(value);
        setState(value);
      }
    };

    handleCopy();
  }, []);

  return [state, copyToClipboard];
}
