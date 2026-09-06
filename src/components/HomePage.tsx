import { type Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/get-translation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage({ lang }: { lang: Locale }) {
  const t = getTranslation(lang);

  return (
    <>
      <Header lang={lang} translations={t} />
      <main>
        <Hero translations={t} />
        <About translations={t} />
        <Projects lang={lang} translations={t} />
        <Contact translations={t} />
      </main>
      <Footer lang={lang} translations={t} />
    </>
  );
}
