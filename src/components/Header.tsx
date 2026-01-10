"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Translation } from "@/lib/i18n/types";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  lang: Locale;
  translations: Translation;
}

export default function Header({ lang, translations: t }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.products },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          sponom<span className="text-accent">.</span>dev
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted hover:text-foreground transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher currentLang={lang} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-muted hover:text-foreground transition-colors text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-4">
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>
      )}
    </header>
  );
}
