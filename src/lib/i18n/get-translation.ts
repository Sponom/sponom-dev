import { defaultLocale, locales, type Locale } from "./config";
import type { Translation } from "./types";

import en from "@/locales/en.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import zh from "@/locales/zh.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import ru from "@/locales/ru.json";

const translations: Record<Locale, Translation> = {
  en,
  es,
  fr,
  de,
  zh,
  ja,
  ko,
  ru,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getTranslation(locale: string): Translation {
  return translations[isLocale(locale) ? locale : defaultLocale];
}
