import { useCallback, useRef, useState } from "react";

export interface UseIntersectionObserverOptions {
  rootMargin?: string;
  root?: Element | null;
  threshold?: number | number[];
}

/**
 * Courtesy of {@link https://usehooks.com/useintersectionobserver}
 *
 * @param options - The options to pass to the IntersectionObserver
 *
 * @returns A tuple containing a ref to attach to the element to observe and the IntersectionObserverEntry
 *
 * @example
 * const [ref, entry] = useIntersectionObserver({
 *  threshold: 0.5,
 *  rootMargin: "0px",
 *  root: null,
 * });
 *
 * <div ref={ref}>
 *  {entry?.isIntersecting ? "Visible" : "Not visible"}
 * </div>
 */
export function useIntersectionObserver(
  options?: UseIntersectionObserverOptions,
) {
  const { threshold = 1, root = null, rootMargin = "0px" } = options || {};

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const previousObserver = useRef<IntersectionObserver>();

  const customRef = useCallback(
    (node: Element) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect();
        previousObserver.current = undefined;
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setEntry(entry);
          },
          { threshold, root, rootMargin },
        );

        observer.observe(node);
        previousObserver.current = observer;
      }
    },
    [threshold, root, rootMargin],
  );

  return [customRef, entry];
}
