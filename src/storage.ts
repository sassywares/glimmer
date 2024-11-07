import { isServer } from "@tanstack/react-query";
import { log } from "./utils";

export const prefix = "app.sassywares";

export class Storage<T = string> {
  readonly key: string;

  constructor(key: string) {
    this.key = `${prefix}.${key}`;
  }

  get(): T | null {
    if (isServer) return null;

    return localStorage.getItem(this.key) as T;
  }

  getParsed(): T | null {
    if (isServer) return null;

    const value = localStorage.getItem(this.key);

    try {
      return JSON.parse(value ?? "");
    } catch (error) {
      log.error(error);
      return null;
    }
  }

  set(value: any): void {
    if (isServer) return;

    localStorage.setItem(this.key, JSON.stringify(value));
  }

  setStringified(value: T): void {
    if (isServer) return;

    localStorage.setItem(this.key, JSON.stringify(value));
  }

  remove(): void {
    if (isServer) return;

    localStorage.removeItem(this.key);
  }
}
