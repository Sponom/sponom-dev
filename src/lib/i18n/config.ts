export const locales = ["en", "es", "fr", "de", "zh", "ja", "ko", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Espanol",
  fr: "Francais",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ru: "Русский",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  zh: "🇨🇳",
  ja: "🇯🇵",
  ko: "🇰🇷",
  ru: "🇷🇺",
};

/** English lives at the bare path; every other locale is prefixed. */
export function localePath(lang: Locale, path = ""): string {
  return lang === defaultLocale ? path || "/" : `/${lang}${path}`;
}
