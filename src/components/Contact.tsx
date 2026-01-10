import type { Translation } from "@/lib/i18n/types";

interface ContactProps {
  translations: Translation;
}

export default function Contact({ translations: t }: ContactProps) {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
          {t.contact.sectionLabel}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          {t.contact.title}
        </h2>
        <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
          {t.contact.description}
        </p>

        <a
          href="mailto:sponom.dev@gmail.com"
          className="inline-block px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-colors"
        >
          {t.contact.cta}
        </a>
      </div>
    </section>
  );
}
