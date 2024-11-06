import { PageProps } from "@/app/[locale]/types";
import { setRequestLocale } from "next-intl/server";
import { ComponentType } from "react";

/**
 * HOC to abstract away the i18n setup required for static rendering of a page.
 * You still have to export `generateStaticParams` from the page if you haven't already from the layout.
 * @see {@link https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-generatestaticparams}
 */
export function PageWithI18n<T extends PageProps>(Component: ComponentType<T>) {
  return async function Page(props: T) {
    const locale = props.params.locale;

    // Enable static rendering
    setRequestLocale(locale);

    return <Component {...props} />;
  };
}
