import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/get-translation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeciderPhone from "@/components/DeciderPhone";

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
    title: t.decider.metaTitle,
    description: t.decider.tagline,
    alternates: {
      canonical: `/${lang}/decider`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/decider`])
      ),
    },
  };
}

export default async function DeciderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getTranslation(locale);

  return (
    <>
      {/* Fonts the prototype UI expects, intentionally loaded only on this page. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Header lang={locale} translations={t} />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            {t.decider.name} · {t.decider.introLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            {t.decider.introTitle}
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            {t.decider.introDescription}
          </p>
        </div>

        <div className="flex justify-center">
          <DeciderPhone name={t.decider.name} prototype={t.decider.prototype} />
        </div>

        <div className="text-center mt-16">
          <Link
            href={`/${locale}`}
            className="text-muted hover:text-foreground transition-colors text-sm"
          >
            ← {t.decider.backHome}
          </Link>
        </div>
      </main>
      <Footer lang={locale} translations={t} />
    </>
  );
}
