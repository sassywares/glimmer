import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { getLangDir } from "rtl-detect";

import { config } from "@/config";
import { routing } from "@/i18n/routing";
import { QueryClientProvider } from "@/providers/query-client.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayoutProps } from "./types";

import { Toaster } from "sonner";
import { Progress } from "./progress";

export function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  const direction = getLangDir(locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body dir={direction} className={GeistSans.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <QueryClientProvider>{children}</QueryClientProvider>
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Progress />
      </body>
    </html>
  );
}
