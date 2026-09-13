"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { countriesInRegion, languageMeta, regions } from "@/content/regions";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import type { LanguageId, RegionId } from "@/content/regions";

export function LocaleMenu() {
  const { locale, country, region, setLocalePrefs, setPanel, panel } = useStore();
  const open = panel === "locale";
  const [localRegion, setLocalRegion] = useState<RegionId>(region);
  const list = useMemo(() => countriesInRegion(localRegion), [localRegion]);

  return (
    <div className="relative">
      <button
        type="button"
        className="hidden min-h-11 items-center px-2 text-[11px] tracking-[0.12em] uppercase sm:inline-flex"
        aria-expanded={open}
        aria-label={`${country.flag} ${country.name[locale]}`}
        onClick={() => setPanel(open ? null : "locale")}
      >
        {country.flag} {locale}
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
                className="min-h-9 border border-border px-2 text-xs"
                onClick={() => setLocalRegion(item.id)}
              >
                {item.label[locale]}
              </button>
            ))}
          </div>
          <ul className="mt-3 max-h-40 overflow-auto">
            {list.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  className="flex min-h-10 w-full items-center gap-2 text-left text-sm hover:bg-muted"
                  onClick={() => {
                    setLocalePrefs({
                      region: item.region,
                      countryCode: item.code,
                      language: item.languages.includes(locale)
                        ? locale
                        : item.languages[0],
                    });
                  }}
                >
                  {item.flag} {item.name[locale]}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            {country.languages.map((id) => (
              <Button
                key={id}
                size="sm"
                variant={id === locale ? "default" : "outline"}
                className="rounded-sm"
                onClick={() => setLocalePrefs({ language: id as LanguageId })}
              >
                {languageMeta[id].flag} {languageMeta[id].label[locale]}
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
