import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locales, localePath, type Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/get-translation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function siteMetadata(lang: Locale): Metadata {
  const t = getTranslation(lang);
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    keywords: t.metadata.keywords,
    authors: [{ name: "Sponom Dev" }],
    creator: "Sponom Dev",
    metadataBase: new URL("https://sponom.dev"),
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l)])),
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: `https://sponom.dev${localePath(lang)}`,
      siteName: "sponom.dev",
      title: t.metadata.title,
      description: t.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.metadata.title,
      description: t.metadata.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function SiteShell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
