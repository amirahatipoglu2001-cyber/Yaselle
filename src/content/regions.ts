export type RegionId =
  | "europe"
  | "north-america"
  | "south-america"
  | "middle-east"
  | "asia-pacific";

export type LanguageId = "tr" | "en";

export type Country = {
  code: string;
  name: { en: string; tr: string };
  flag: string;
  currency: string;
  currencySymbol: string;
  languages: LanguageId[];
  region: RegionId;
};

export const regions: {
  id: RegionId;
  label: { en: string; tr: string };
}[] = [
  { id: "europe", label: { en: "Europe", tr: "Avrupa" } },
  { id: "north-america", label: { en: "North America", tr: "Kuzey Amerika" } },
  { id: "south-america", label: { en: "South America", tr: "Güney Amerika" } },
  { id: "middle-east", label: { en: "Middle East", tr: "Ortadoğu" } },
  { id: "asia-pacific", label: { en: "Asia Pacific", tr: "Asya Pasifik" } },
];

export const countries: Country[] = [
  { code: "TR", name: { en: "Turkey", tr: "Türkiye" }, flag: "🇹🇷", currency: "TRY", currencySymbol: "₺", languages: ["tr", "en"], region: "europe" },
  { code: "FR", name: { en: "France", tr: "Fransa" }, flag: "🇫🇷", currency: "EUR", currencySymbol: "€", languages: ["en", "tr"], region: "europe" },
  { code: "DE", name: { en: "Germany", tr: "Almanya" }, flag: "🇩🇪", currency: "EUR", currencySymbol: "€", languages: ["en", "tr"], region: "europe" },
  { code: "GB", name: { en: "United Kingdom", tr: "Birleşik Krallık" }, flag: "🇬🇧", currency: "GBP", currencySymbol: "£", languages: ["en", "tr"], region: "europe" },
  { code: "IT", name: { en: "Italy", tr: "İtalya" }, flag: "🇮🇹", currency: "EUR", currencySymbol: "€", languages: ["en", "tr"], region: "europe" },
  { code: "NL", name: { en: "Netherlands", tr: "Hollanda" }, flag: "🇳🇱", currency: "EUR", currencySymbol: "€", languages: ["en", "tr"], region: "europe" },
  { code: "ES", name: { en: "Spain", tr: "İspanya" }, flag: "🇪🇸", currency: "EUR", currencySymbol: "€", languages: ["en", "tr"], region: "europe" },
  { code: "US", name: { en: "United States", tr: "Amerika Birleşik Devletleri" }, flag: "🇺🇸", currency: "USD", currencySymbol: "$", languages: ["en", "tr"], region: "north-america" },
  { code: "CA", name: { en: "Canada", tr: "Kanada" }, flag: "🇨🇦", currency: "CAD", currencySymbol: "$", languages: ["en", "tr"], region: "north-america" },
  { code: "BR", name: { en: "Brazil", tr: "Brezilya" }, flag: "🇧🇷", currency: "BRL", currencySymbol: "R$", languages: ["en", "tr"], region: "south-america" },
  { code: "AR", name: { en: "Argentina", tr: "Arjantin" }, flag: "🇦🇷", currency: "USD", currencySymbol: "$", languages: ["en", "tr"], region: "south-america" },
  { code: "AE", name: { en: "United Arab Emirates", tr: "Birleşik Arap Emirlikleri" }, flag: "🇦🇪", currency: "AED", currencySymbol: "د.إ", languages: ["en", "tr"], region: "middle-east" },
  { code: "SA", name: { en: "Saudi Arabia", tr: "Suudi Arabistan" }, flag: "🇸🇦", currency: "SAR", currencySymbol: "﷼", languages: ["en", "tr"], region: "middle-east" },
  { code: "QA", name: { en: "Qatar", tr: "Katar" }, flag: "🇶🇦", currency: "QAR", currencySymbol: "ر.ق", languages: ["en", "tr"], region: "middle-east" },
  { code: "KW", name: { en: "Kuwait", tr: "Kuveyt" }, flag: "🇰🇼", currency: "KWD", currencySymbol: "د.ك", languages: ["en", "tr"], region: "middle-east" },
  { code: "JP", name: { en: "Japan", tr: "Japonya" }, flag: "🇯🇵", currency: "JPY", currencySymbol: "¥", languages: ["en", "tr"], region: "asia-pacific" },
  { code: "AU", name: { en: "Australia", tr: "Avustralya" }, flag: "🇦🇺", currency: "AUD", currencySymbol: "$", languages: ["en", "tr"], region: "asia-pacific" },
  { code: "SG", name: { en: "Singapore", tr: "Singapur" }, flag: "🇸🇬", currency: "SGD", currencySymbol: "$", languages: ["en", "tr"], region: "asia-pacific" },
  { code: "KR", name: { en: "South Korea", tr: "Güney Kore" }, flag: "🇰🇷", currency: "KRW", currencySymbol: "₩", languages: ["en", "tr"], region: "asia-pacific" },
];

export const languageMeta: Record<
  LanguageId,
  { flag: string; label: { en: string; tr: string } }
> = {
  tr: { flag: "🇹🇷", label: { en: "Turkish", tr: "Türkçe" } },
  en: { flag: "🇬🇧", label: { en: "English", tr: "English" } },
};

export const ratesFromTry: Record<string, number> = {
  TRY: 1,
  EUR: 0.025,
  USD: 0.029,
  GBP: 0.022,
  CAD: 0.04,
  BRL: 0.16,
  AED: 0.11,
  SAR: 0.11,
  QAR: 0.11,
  KWD: 0.009,
  JPY: 4.4,
  AUD: 0.044,
  SGD: 0.038,
  KRW: 40,
};

export function countryByCode(code: string) {
  return countries.find((country) => country.code === code);
}

export function countriesInRegion(region: RegionId) {
  return countries.filter((country) => country.region === region);
}

export function regionFromCountryName(name: string) {
  const lower = name.toLowerCase();
  return countries.find(
    (country) =>
      country.name.en.toLowerCase() === lower ||
      country.name.tr.toLowerCase() === lower ||
      country.code.toLowerCase() === lower,
  );
}
