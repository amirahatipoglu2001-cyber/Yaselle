"use client";

import { useEffect } from "react";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export function DocumentLocale() {
  const { locale } = useStore();

  useEffect(() => {
    const root = document.documentElement;
    // Follow the shopper's TR/EN choice for assistive tech.
    root.lang = locale;
    root.setAttribute("data-locale", locale);
    // CSS `uppercase` under lang="tr" maps i → İ. Keep latin casing by
    // leaving layout's initial html[lang]=en for first paint, then only
    // applying tr after hydrate — labels that use uppercase are already
    // written in the active locale (DİL SEÇİN / İndirim), not English i.
  }, [locale]);

  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
    >
      {t(locale, "skip")}
    </a>
  );
}
