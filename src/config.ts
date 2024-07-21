import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "ur"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    ur: "/پاتھ نیمز",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export interface Config {
  BASE_URL: string;
}

export const config: Config = {
  BASE_URL: getConfig("NEXT_PUBLIC_BASE_URL", "http://localhost:3000"),
};

function getConfig(key: string, defaultValue = ""): string {
  const envValue = process.env[key];
  return envValue ?? defaultValue;
}
