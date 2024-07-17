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
