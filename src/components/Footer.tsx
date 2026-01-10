import type { Locale } from "@/lib/i18n/config";
import type { Translation } from "@/lib/i18n/types";

interface FooterProps {
  lang: Locale;
  translations: Translation;
}

export default function Footer({ translations: t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {currentYear} {t.footer.copyright}
        </p>
        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.nav.about}
          </a>
          <a
            href="#projects"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.nav.products}
          </a>
          <a
            href="#contact"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.nav.contact}
          </a>
        </nav>
      </div>
    </footer>
  );
}
