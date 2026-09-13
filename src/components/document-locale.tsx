"use client";

import { useEffect } from "react";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export function DocumentLocale() {
  const { locale } = useStore();

  useEffect(() => {
    document.documentElement.lang = locale;
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
