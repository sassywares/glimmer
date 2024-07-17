import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { locales, pathnames, localePrefix } from "./config";

export const { Link, redirect, useRouter, getPathname, usePathname } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
