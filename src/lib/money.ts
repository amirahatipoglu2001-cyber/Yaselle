import type { Locale } from "@/content/catalog";
import { ratesFromTry, type Country } from "@/content/regions";

export function convertFromTry(amountTry: number, currency: string) {
  const rate = ratesFromTry[currency] ?? 1;
  if (currency === "JPY" || currency === "KRW") {
    return Math.round(amountTry * rate);
  }
  return Math.round(amountTry * rate * 100) / 100;
}

const numberLocales: Record<string, string> = {
  tr: "tr-TR",
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  es: "es-ES",
  nl: "nl-NL",
  pt: "pt-BR",
  ar: "ar-AE",
  ja: "ja-JP",
  ko: "ko-KR",
};

export function formatMoney(amountTry: number, country: Country, locale: Locale) {
  const value = convertFromTry(amountTry, country.currency);
  const numberLocale = numberLocales[locale] ?? "en-GB";
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: country.currency,
    maximumFractionDigits: country.currency === "JPY" || country.currency === "KRW" ? 0 : 0,
  }).format(value);
}
