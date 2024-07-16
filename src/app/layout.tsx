import "./globals.css";

import { Bricolage_Grotesque } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";

import { getLangDir } from "rtl-detect";

import { Toaster } from "@/modules/shared/components";
import { ThemeProvider, QueryClientProvider } from "@/modules/shared/providers";

import type { Metadata } from "next";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = getLangDir(locale);

  return (
    <html lang={locale}>
      <body dir={direction} className={bricolage.className}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <QueryClientProvider>{children}</QueryClientProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
