// src/modules/shared/hooks/use-debounced-fn.ts
"use client";

import { useCallback, useEffect, useRef } from "react";
import { defaultDebounceDelay } from "../shared.config";

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

// src/modules/shared/hooks/use-debounced-fn.ts

type CallbackFunction = (...args: any[]) => void;

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
