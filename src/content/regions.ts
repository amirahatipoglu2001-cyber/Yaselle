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
  /** Extra regions where this country must still appear (Türkiye in Ortadoğu). */
  alsoInRegions?: RegionId[];
  /** Extra search needles: English, ASCII, ISO, typos. */
  searchAliases?: string[];
};

/** Storefront languages — always both, never derived from a half-empty country map. */
export const shopLanguages: LanguageId[] = ["tr", "en"];

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
  {
    code: "TR",
    name: { en: "Türkiye", tr: "Türkiye" },
    flag: "🇹🇷",
    currency: "TRY",
    currencySymbol: "₺",
    languages: ["tr", "en"],
    region: "europe",
    alsoInRegions: ["middle-east"],
    searchAliases: [
      "Turkey",
      "Turkiye",
      "Türkiye",
      "Turky",
      "Turkie",
      "Turkiya",
      "Turkıye",
      "Tuerkiye",
      "TR",
    ],
  },
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
  tr: { flag: "🇹🇷", label: { en: "Türkçe", tr: "Türkçe" } },
  en: { flag: "🇬🇧", label: { en: "English", tr: "English" } },
};

/** Native labels so the language row is never blank or locale-swapped. */
export function languageLabel(id: LanguageId) {
  return languageMeta[id].label[id === "tr" ? "tr" : "en"];
}

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

function pinTurkiyeFirst(list: Country[]) {
  return [...list].sort((a, b) => Number(b.code === "TR") - Number(a.code === "TR"));
}

export function countriesInRegion(region: RegionId) {
  return pinTurkiyeFirst(
    countries.filter(
      (country) => country.region === region || country.alsoInRegions?.includes(region),
    ),
  );
}

/**
 * Fold Turkish/ASCII so "türkiye", "turkiye", "TÜRKİYE", "Turkey", "tr" all match.
 * Maps İ/I/ı to i before lowercasing so CSS/JS locale İ bugs cannot hide TR.
 */
export function foldCountryQuery(value: string) {
  return value
    .replaceAll("İ", "i")
    .replaceAll("I", "i")
    .replaceAll("ı", "i")
    .replaceAll("Ş", "s")
    .replaceAll("ş", "s")
    .replaceAll("Ğ", "g")
    .replaceAll("ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("ü", "u")
    .replaceAll("Ö", "o")
    .replaceAll("ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ç", "c")
    .replace(/\u0307/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function countryMatchesQuery(country: Country, query: string) {
  const q = foldCountryQuery(query);
  if (!q) return true;
  const fields = [
    country.code,
    country.name.en,
    country.name.tr,
    ...(country.searchAliases ?? []),
  ].map(foldCountryQuery);
  if (q.length <= 2) {
    return fields.some((field) => field === q || field.startsWith(q));
  }
  return fields.some((field) => field.includes(q));
}

/** Empty query stays in-region; typing searches the full list so TR is never hidden. */
export function searchCountries(query: string, region: RegionId) {
  const source = query.trim() ? countries : countriesInRegion(region);
  return pinTurkiyeFirst(source.filter((country) => countryMatchesQuery(country, query)));
}

export function regionFromCountryName(name: string) {
  const folded = foldCountryQuery(name);
  return countries.find((country) => countryMatchesQuery(country, name) && (
    foldCountryQuery(country.code) === folded ||
    foldCountryQuery(country.name.en) === folded ||
    foldCountryQuery(country.name.tr) === folded ||
    (country.searchAliases ?? []).some((alias) => foldCountryQuery(alias) === folded)
  ));
}
