import axios from "axios";

// =============================================================================
// Constants
// =============================================================================

export const defaultLocale = "en";
export const locales = [defaultLocale, "de"];

export const defaultDebounceDelay = 500;

/** 30 minutes */
export const defaultStaleTime = 1000 * 60 * 30;

/** The client-side base-api instance to use */
export const baseService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_SERVICE_URL,
});
