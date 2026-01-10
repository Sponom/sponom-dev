import { type Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/get-translation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getTranslation(locale);

  return (
    <>
      <Header lang={locale} translations={t} />
      <main>
        <Hero translations={t} />
        <About translations={t} />
        <Projects translations={t} />
        <Contact translations={t} />
      </main>
      <Footer lang={locale} translations={t} />
    </>
  );
}
