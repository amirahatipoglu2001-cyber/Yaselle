"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { loc, products } from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

const popular = ["abaya", "tesettür", "abiye", "çanta", "tunik"];

export function SearchPanel() {
  const { locale, panel, setPanel, recentSearches, pushSearch } = useStore();
  const router = useRouter();
  const open = panel === "search";
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const results = useMemo(() => {
    if (debounced.length < 2) return [];
    const q = debounced.toLowerCase();
    return products.filter(
      (product) =>
        product.name.en.toLowerCase().includes(q) ||
        product.name.tr.toLowerCase().includes(q) ||
        product.category.includes(q) ||
        product.subcategory.includes(q),
    ).slice(0, 6);
  }, [debounced]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setPanel(next ? "search" : null);
        if (!next) setQuery("");
      }}
    >
      <DialogContent className="top-24 max-w-xl translate-y-0 rounded-sm sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t(locale, "searchPlaceholder")}</DialogTitle>
        </DialogHeader>
        <Input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(locale, "searchPlaceholder")}
          className="h-11 rounded-sm"
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim().length >= 2) {
              pushSearch(query);
              setPanel(null);
              router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
            }
          }}
        />
        {debounced.length < 2 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                {t(locale, "recentSearches")}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {recentSearches.length === 0 ? (
                  <li className="text-muted-foreground">—</li>
                ) : (
                  recentSearches.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="min-h-10 text-left"
                        onClick={() => setQuery(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                {t(locale, "popularSearches")}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {popular.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="min-h-10 text-left"
                      onClick={() => setQuery(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t(locale, "noSearch")}</p>
        ) : (
          <ul className="space-y-2">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.slug}`}
                  className="flex min-h-11 items-center justify-between text-sm"
                  onClick={() => {
                    pushSearch(query);
                    setPanel(null);
                  }}
                >
                  {loc(product.name, locale)}
                  <span className="text-muted-foreground">{product.subcategory}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
