import { useCallback, useEffect, useSyncExternalStore } from "react";
import { dispatchStorageEvent } from "../shared.utils";

const setLocalStorageItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getLocalStorageServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

/**
 * Courtesy of {@link https://usehooks.com/uselocalstorage/}
 *
 * @param key - The key to store the value under in localStorage
 * @param initialValue - The initial value to store in localStorage
 *
 * @returns A tuple containing the current value and a function to set the value
 *
 * @example
 * const [value, setValue] = useLocalStorage("my-key", "my-value");
 */
export function useLocalStorage(key: string, initialValue: any) {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot,
  );

  const setState = useCallback(
    (v: any) => {
      if (!store) {
        return;
      }

      try {
        const nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store],
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
