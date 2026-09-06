"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeFlags, localePath, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Keep the current page (e.g. /decider) when the language changes: strip the
  // locale prefix if there is one, then re-prefix for the target locale.
  function localizedHref(locale: Locale) {
    const segments = (pathname ?? "/").split("/");
    // segments[0] is "" (leading slash); segments[1] may be a locale prefix.
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments.splice(1, 1);
    }
    const rest = segments.join("/").replace(/\/$/, "");
    return localePath(locale, rest);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{localeFlags[currentLang]}</span>
        <span>{localeNames[currentLang]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 bg-background border border-border rounded-lg shadow-lg z-50">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={localizedHref(locale)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                locale === currentLang
                  ? "text-accent bg-accent/5"
                  : "text-muted hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <span>{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
