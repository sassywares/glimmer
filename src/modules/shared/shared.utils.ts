import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isShallowEqual(
  object1: Record<any, any>,
  object2: Record<any, any>,
) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export function isTouchEvent(nativeEvent: Event) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : "touches" in nativeEvent;
}

export function isMouseEvent(event: React.MouseEvent | React.TouchEvent) {
  return event.nativeEvent instanceof MouseEvent;
}

export function dispatchStorageEvent(key: string, newValue?: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

export function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}
