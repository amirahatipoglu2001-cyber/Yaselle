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

function LanguageMenu() {
  const { locale, setLocalePrefs } = useStore();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center"
        aria-label={t(locale, "selectLanguage")}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Globe className="size-5" aria-hidden />
      </button>
      {open ? (
        <ul
          role="menu"
          className="absolute top-full right-0 z-50 mt-1 min-w-36 border border-border bg-background py-1 shadow-sm"
        >
          {shopLanguages.map((id) => (
            <li key={id} role="none">
              <button
                type="button"
                role="menuitem"
                aria-current={id === locale ? "true" : undefined}
                className={cn(
                  "flex min-h-10 w-full items-center px-3 text-left text-sm hover:bg-muted",
                  id === locale ? "bg-secondary" : "",
                )}
                onClick={() => {
                  setLocalePrefs({ language: id });
                  setOpen(false);
                }}
              >
                {languageLabel(id)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const { locale, country, cartCount, setPanel, collections } = useStore();
  const [scrolled, setScrolled] = useState(false);
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
            {t(locale, "brand")}
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <LanguageMenu />
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
