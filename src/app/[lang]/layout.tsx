import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { isLocale } from "@/lib/i18n/get-translation";
import SiteShell, { siteMetadata } from "@/components/SiteShell";
import "../globals.css";

/* English is served from the bare path (see `(en)`); only the rest get a prefix. */
const prefixed = locales.filter((l) => l !== defaultLocale);

export function generateStaticParams() {
  return prefixed.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return siteMetadata(lang as Locale);
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang) || lang === defaultLocale) {
    notFound();
  }

  return <SiteShell lang={lang}>{children}</SiteShell>;
}
