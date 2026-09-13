"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  languageLabel,
  languageMeta,
  regions,
  searchCountries,
  shopLanguages,
} from "@/content/regions";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { LanguageId, RegionId } from "@/content/regions";

export function LocaleMenu() {
  const { locale, country, region, setLocalePrefs, setPanel, panel } = useStore();
  const open = panel === "locale";
  const [localRegion, setLocalRegion] = useState<RegionId>(region);
  const [query, setQuery] = useState("");
  const list = useMemo(
    () => searchCountries(query, localRegion),
    [localRegion, query],
  );

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex min-h-11 items-center px-2 text-[11px] tracking-[0.12em] sm:uppercase"
        aria-expanded={open}
        aria-label={`${country.flag} ${country.name[locale]} · ${languageLabel(locale)}`}
        onClick={() => setPanel(open ? null : "locale")}
      >
        {country.flag} {languageLabel(locale)}
      </button>
      {open ? (
        <div className="absolute top-full right-0 z-50 mt-1 w-[min(90vw,22rem)] border border-border bg-background p-4 shadow-sm">
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {t(locale, "selectCountry")}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {regions.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "min-h-9 border px-2 text-xs",
                  localRegion === item.id ? "border-primary bg-secondary" : "border-border",
                )}
                onClick={() => {
                  setLocalRegion(item.id);
                  setQuery("");
                }}
              >
                {item.label[locale]}
              </button>
            ))}
          </div>
          <Input
            className="mt-3 h-10 rounded-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(locale, "searchCountry")}
            aria-label={t(locale, "searchCountry")}
          />
          <ul className="mt-3 max-h-40 overflow-auto">
            {list.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  className={cn(
                    "flex min-h-10 w-full items-center gap-2 text-left text-sm hover:bg-muted",
                    item.code === country.code ? "bg-secondary" : "",
                  )}
                  onClick={() => {
                    setLocalePrefs({
                      region: item.region,
                      countryCode: item.code,
                      language: item.code === "TR" ? "tr" : locale,
                    });
                    setLocalRegion(item.region);
                  }}
                >
                  {item.flag} {item.name[locale]}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {t(locale, "selectLanguage")}
          </p>
          <div className="mt-2 flex gap-2">
            {shopLanguages.map((id) => (
              <Button
                key={id}
                size="sm"
                variant={id === locale ? "default" : "outline"}
                className="rounded-sm"
                onClick={() => setLocalePrefs({ language: id as LanguageId })}
              >
                {languageMeta[id].flag} {languageLabel(id)}
              </Button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {t(locale, "currency")}: {country.currency}
          </p>
        </div>
      ) : null}
    </div>
  );
}
