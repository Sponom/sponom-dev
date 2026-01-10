import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locales, type Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/get-translation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslation(lang as Locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    keywords: t.metadata.keywords,
    authors: [{ name: "Sponom Dev" }],
    creator: "Sponom Dev",
    metadataBase: new URL("https://sponom.dev"),
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `https://sponom.dev/${lang}`,
      siteName: "sponom.dev",
      title: t.metadata.title,
      description: t.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.title,
      description: t.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
