import { LayoutProps } from "@/app/[locale]/types";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ComponentType } from "react";
import { routing } from "./routing";

/**
 * HOC to abstract away the i18n setup required for static rendering of a layout.
 * You still have to export `generateStaticParams` from the layout though.
 * @see {@link https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-generatestaticparams}
 */
export function LayoutWithI18n<T extends LayoutProps>(
  Component: ComponentType<T>,
) {
  return async function Layout(props: T) {
    const locale = props.params.locale;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
      notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return <Component {...props} />;
  };
}
