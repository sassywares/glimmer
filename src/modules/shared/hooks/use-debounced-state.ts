// src/modules/shared/hooks/use-debounced-state.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { defaultDebounceDelay } from "../shared.config";

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

// src/modules/shared/hooks/use-debounced-state.ts

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
