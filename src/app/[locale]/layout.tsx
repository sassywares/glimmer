import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Bricolage_Grotesque } from "next/font/google";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import { getLangDir } from "rtl-detect";

import { locales } from "@/config";
import { Toaster } from "@/modules/shared/components";
import { ThemeProvider, QueryClientProvider } from "@/modules/shared/providers";

import type { Metadata } from "next";
import type { PageParams, LayoutProps } from "@/modules/shared/shared.types";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomeLayout({
  children,
  params: { locale },
}: LayoutProps) {
  const direction = getLangDir(locale);

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body dir={direction} className={bricolage.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <QueryClientProvider>{children}</QueryClientProvider>
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
