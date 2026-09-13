import { ratesFromTry, type Country } from "@/content/regions";

export function convertFromTry(amountTry: number, currency: string) {
  const rate = ratesFromTry[currency] ?? 1;
  if (currency === "JPY" || currency === "KRW") {
    return Math.round(amountTry * rate);
  }
  return Math.round(amountTry * rate * 100) / 100;
}

export function formatMoney(amountTry: number, country: Country, locale: "en" | "tr") {
  const value = convertFromTry(amountTry, country.currency);
  const numberLocale = locale === "tr" ? "tr-TR" : "en-GB";
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: country.currency,
    maximumFractionDigits: country.currency === "JPY" || country.currency === "KRW" ? 0 : 0,
  }).format(value);
}
