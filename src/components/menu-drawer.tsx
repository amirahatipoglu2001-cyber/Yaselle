"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { categoryTree, loc, menuExtras } from "@/content/catalog";
import { t } from "@/content/i18n";
import { languageLabel, languageMeta, shopLanguages } from "@/content/regions";
import { useStore } from "@/lib/store";

export function MenuDrawer() {
  const { locale, country, panel, setPanel, setLocalePrefs } = useStore();
  const router = useRouter();
  const open = panel === "menu";
  const closeRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setPanel]);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => setPanel(next ? "menu" : null)}
    >
      <SheetContent
        side="left"
        className="w-[min(100%,28rem)] bg-background p-0 sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border p-4">
          <SheetTitle className="font-display tracking-[0.16em] uppercase">
            {t(locale, "brand")}
          </SheetTitle>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex size-11 items-center justify-center"
            aria-label={t(locale, "close")}
            onClick={() => setPanel(null)}
          >
            <X className="size-5" />
          </button>
        </SheetHeader>
        <div className="overflow-y-auto p-4 pb-16">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(locale, "searchPlaceholder")}
            className="h-11 rounded-sm"
            onKeyDown={(event) => {
              if (event.key === "Enter" && query.trim()) {
                router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
                setPanel(null);
              }
            }}
          />
          <Link
            href="/"
            className="mt-6 flex min-h-11 items-center font-medium"
            onClick={() => setPanel(null)}
          >
            {t(locale, "navHome")}
          </Link>
          <p className="mt-6 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {t(locale, "sizeGuide")}
          </p>
          <Link
            href="/help/size-guide"
            className="mt-2 flex min-h-11 items-center justify-between border-b border-border font-medium"
            onClick={() => setPanel(null)}
          >
            {t(locale, "sizeGuideCm")}
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
          <p className="mt-6 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {t(locale, "categories")}
          </p>
          <ul className="mt-3 space-y-4">
            {categoryTree.map((category) => (
              <li key={category.id}>
                <Link
                  href={category.href}
                  className="font-medium"
                  onClick={() => setPanel(null)}
                >
                  {loc(category.label, locale)}
                </Link>
                {category.children.length > 0 ? (
                  <ul className="mt-2 space-y-1 pl-3 text-sm text-muted-foreground">
                    {category.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={`${category.href}?sub=${child.id}`}
                          onClick={() => setPanel(null)}
                        >
                          {loc(child.label, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <nav className="mt-6 flex flex-col">
            {menuExtras.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center justify-between border-b border-border text-sm"
                onClick={() => setPanel(null)}
              >
                {loc(item.label, locale)}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
            <button
              type="button"
              className="mt-6 min-h-11 text-left text-sm underline underline-offset-4"
              onClick={() => setPanel("account")}
            >
              {t(locale, "signInCreate")}
            </button>
            <button
              type="button"
              className="min-h-11 text-left text-sm underline underline-offset-4"
              onClick={() => {
                setPanel(null);
                document.getElementById("yaselle-chat")?.scrollIntoView();
                window.dispatchEvent(new Event("yaselle-open-chat"));
              }}
            >
              {t(locale, "chatSupport")}
            </button>
            <p className="mt-8 text-xs text-muted-foreground">
              {country.flag} {loc(country.name, locale)} · {country.currency}
            </p>
            <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
              {t(locale, "selectLanguage")}
            </p>
            <div className="mt-2 flex max-h-52 flex-wrap gap-2 overflow-y-auto overscroll-contain">
              {shopLanguages.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="min-h-11 border border-border px-3 text-sm"
                  onClick={() => setLocalePrefs({ language: id })}
                >
                  {languageMeta[id].flag} {languageLabel(id)}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
