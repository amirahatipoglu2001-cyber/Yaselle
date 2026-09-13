"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Globe, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { t } from "@/content/i18n";
import { languageLabel, shopLanguages } from "@/content/regions";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MenuDrawer } from "@/components/menu-drawer";
import { SearchPanel } from "@/components/search-panel";
import { CartDrawer } from "@/components/cart-drawer";
import { AccountPanel } from "@/components/account-panel";

const WORDMARK = "YASELLE AI";

export function SiteHeader() {
  const { locale, country, cartCount, setPanel, setLocalePrefs, collections } =
    useStore();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const savedCount = collections.reduce(
    (sum, collection) => sum + collection.productIds.length,
    0,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-background/95 shadow-[0_1px_0_rgb(23_23_23/10%)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[72px] sm:px-6">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label={t(locale, "menu")}
              onClick={() => setPanel("menu")}
            >
              <Menu className="size-5" />
            </button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label={t(locale, "search")}
              onClick={() => setPanel("search")}
            >
              <Search className="size-5" />
            </button>
          </div>

          <Link
            href="/"
            className="font-display whitespace-nowrap text-sm tracking-[0.14em] uppercase sm:text-xl sm:tracking-[0.22em]"
          >
            {WORDMARK}
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <div className="relative" ref={langRef}>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center"
                aria-label={t(locale, "selectLanguage")}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                onClick={() => setLangOpen((open) => !open)}
              >
                <Globe className="size-5" aria-hidden />
              </button>
              {langOpen ? (
                <ul
                  role="listbox"
                  className="absolute top-full right-0 z-50 mt-1 min-w-[8.5rem] border border-border bg-background py-1 shadow-sm"
                >
                  {shopLanguages.map((id) => (
                    <li key={id} role="option" aria-selected={id === locale}>
                      <button
                        type="button"
                        className={cn(
                          "flex min-h-11 w-full items-center px-3 text-left text-sm",
                          id === locale ? "bg-secondary" : "hover:bg-muted",
                        )}
                        onClick={() => {
                          setLocalePrefs({ language: id });
                          setLangOpen(false);
                        }}
                      >
                        {languageLabel(id)}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label={t(locale, "account")}
              onClick={() => setPanel("account")}
            >
              <User className="size-5" />
            </button>
            <Link
              href="/favorites"
              className="relative inline-flex size-11 items-center justify-center"
              aria-label={t(locale, "favorites")}
            >
              <Heart className="size-5" />
              {savedCount > 0 ? (
                <span className="absolute top-1.5 right-1 min-w-4 rounded-sm bg-primary px-1 text-[10px] text-primary-foreground">
                  {savedCount}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="relative inline-flex size-11 items-center justify-center"
              aria-label={t(locale, "cart")}
              onClick={() => setPanel("cart")}
            >
              <ShoppingBag className="size-5" />
              {cartCount > 0 ? (
                <span className="absolute top-1.5 right-1 min-w-4 rounded-sm bg-primary px-1 text-[10px] text-primary-foreground">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
        <p className="sr-only">
          {country.flag} {country.name[locale]} · {languageLabel(locale)}
        </p>
      </header>
      <MenuDrawer />
      <SearchPanel />
      <CartDrawer />
      <AccountPanel />
    </>
  );
}
