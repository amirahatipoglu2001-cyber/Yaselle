"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  countriesInRegion,
  countryByCode,
  languageLabel,
  languageMeta,
  regionFromCountryName,
  regions,
  searchCountries,
  shopLanguages,
} from "@/content/regions";
import { loc } from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { LanguageId, RegionId } from "@/content/regions";

export function RegionGate() {
  const { hydrated, completedGate, completeGate, locale } = useStore();
  const [region, setRegion] = useState<RegionId>("europe");
  const [countryCode, setCountryCode] = useState("TR");
  const [language, setLanguage] = useState<LanguageId>("tr");
  const [query, setQuery] = useState("");
  const [step, setStep] = useState<"region" | "country">("region");
  const [locationNote, setLocationNote] = useState<"idle" | "denied" | "hint">("hint");

  const list = useMemo(() => searchCountries(query, region), [query, region]);
  const selected = countryByCode(countryCode) ?? countriesInRegion(region)[0];

  async function useLocation() {
    if (!navigator.geolocation) {
      setLocationNote("denied");
      setStep("country");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
          const response = await fetch(url);
          const data = (await response.json()) as {
            countryName?: string;
            countryCode?: string;
          };
          const match =
            regionFromCountryName(data.countryCode ?? "") ??
            regionFromCountryName(data.countryName ?? "");
          if (match) {
            setRegion(match.region);
            setCountryCode(match.code);
            setLanguage(match.languages[0] ?? "en");
            setQuery("");
            setStep("country");
            setLocationNote("hint");
          } else {
            setLocationNote("denied");
            setStep("country");
          }
        } catch {
          setLocationNote("denied");
          setStep("country");
        }
      },
      () => {
        setLocationNote("denied");
        setStep("country");
      },
    );
  }

  if (!hydrated || completedGate) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#F8F6F2]">
      <div className="absolute inset-0 bg-primary/20" aria-hidden />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="region-title"
        className="relative z-10 mx-4 w-full max-w-2xl border border-border bg-background p-8 sm:p-12"
      >
        <p className="font-display text-2xl tracking-[0.16em] uppercase">YASELLE</p>
        {step === "region" ? (
          <>
            <h1 id="region-title" className="mt-8 text-sm tracking-[0.22em] uppercase">
              {t(locale, "regionTitle")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{t(locale, "regionIntro")}</p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {regions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRegion(item.id);
                    const first = countriesInRegion(item.id)[0];
                    setCountryCode(first.code);
                    setLanguage(first.languages[0] ?? "en");
                    setQuery("");
                    setStep("country");
                  }}
                  className={cn(
                    "min-h-11 border px-4 py-3 text-left text-sm",
                    region === item.id ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {loc(item.label, locale)}
                </button>
              ))}
            </div>
            <p className="mt-6 text-center text-xs tracking-[0.18em] uppercase text-muted-foreground">
              {t(locale, "or")}
            </p>
            <Button className="mt-3 w-full rounded-sm" variant="outline" onClick={useLocation}>
              {t(locale, "useLocation")}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">{t(locale, "locationHint")}</p>
          </>
        ) : null}

        {step === "country" && selected ? (
          <>
            <h1 id="region-title" className="mt-8 text-sm tracking-[0.22em] uppercase">
              {t(locale, "selectCountry")}
            </h1>
            {locationNote === "denied" ? (
              <p className="mt-3 text-sm text-muted-foreground">{t(locale, "locationDenied")}</p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{t(locale, "locationHint")}</p>
            )}
            <Input
              className="mt-5 h-11 rounded-sm"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(locale, "searchCountry")}
              aria-label={t(locale, "searchCountry")}
            />
            <ul className="mt-4 max-h-64 space-y-1 overflow-auto">
              {list.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setCountryCode(country.code);
                      setRegion(country.region);
                    }}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 border px-3 text-left text-sm",
                      country.code === countryCode
                        ? "border-primary bg-secondary"
                        : "border-transparent hover:bg-muted",
                    )}
                  >
                    <span aria-hidden>{country.flag}</span>
                    {loc(country.name, locale)}
                  </button>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-sm tracking-[0.22em] uppercase">
              {t(locale, "selectLanguage")}
            </h2>
            <p className="mt-3 text-sm">
              {t(locale, "country")}: {selected.flag} {loc(selected.name, locale)}
            </p>
            <div className="mt-4 flex max-h-48 flex-wrap gap-2 overflow-y-auto overscroll-contain">
              {shopLanguages.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLanguage(id)}
                  className={cn(
                    "min-h-11 border px-4 text-sm",
                    language === id ? "border-primary bg-secondary" : "border-border",
                  )}
                >
                  {languageMeta[id].flag} {languageLabel(id)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t(locale, "currency")}: {selected.currency} ({selected.currencySymbol})
            </p>
            <Button
              className="mt-8 w-full rounded-sm"
              size="lg"
              onClick={() =>
                completeGate({ region: selected.region, countryCode: selected.code, language })
              }
            >
              {t(locale, "continueShopping")}
            </Button>
            <Button className="mt-3 w-full rounded-sm" variant="ghost" onClick={() => setStep("region")}>
              {t(locale, "change")}
            </Button>
          </>
        ) : null}
      </section>
    </div>
  );
}
