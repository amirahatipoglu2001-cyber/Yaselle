"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { t } from "@/content/i18n";
import { languageMeta } from "@/content/regions";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MenuDrawer } from "@/components/menu-drawer";
import { SearchPanel } from "@/components/search-panel";
import { CartDrawer } from "@/components/cart-drawer";
import { AccountPanel } from "@/components/account-panel";
import { LocaleMenu } from "@/components/locale-menu";

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
            className="font-display whitespace-nowrap text-base tracking-[0.18em] sm:text-xl sm:tracking-[0.28em]"
          >
            YASELLE
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <LocaleMenu />
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
          {country.flag} {country.name[locale]} · {languageMeta[locale].label[locale]}
        </p>
      </header>
      <MenuDrawer />
      <SearchPanel />
      <CartDrawer />
      <AccountPanel />
    </>
  );
}
