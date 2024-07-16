import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { locales } from "./modules/shared/shared.config";

export const { Link, redirect, useRouter, usePathname } =
  createSharedPathnamesNavigation({ locales });
