"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProductById } from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function FavoritesPage() {
  const { locale, collections, createCollection, shareCollection } = useStore();
  const [name, setName] = useState("");
  const [copied, setCopied] = useState("");
  const all = collections.flatMap((collection) => collection.productIds);
  const unique = [...new Set(all)].map(getProductById).filter(Boolean);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-4xl">{t(locale, "favorites")}</h1>
      {unique.length === 0 ? (
        <div className="mt-10">
          <p>{t(locale, "emptyFav")}</p>
          <Link href="/shop/yeni-koleksiyon" className={cn(buttonVariants(), "mt-5 rounded-sm")}>
            {t(locale, "exploreNew")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {unique.map((product) => (
            <ProductCard key={product!.id} product={product!} />
          ))}
        </div>
      )}

      <section className="mt-16">
        <h2 className="font-display text-3xl">{t(locale, "createCollection")}</h2>
        <form
          className="mt-4 flex max-w-md gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (name.trim()) {
              createCollection(name.trim());
              setName("");
            }
          }}
        >
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t(locale, "collectionName")}
            className="h-11 rounded-sm"
          />
          <Button className="rounded-sm" type="submit">
            {t(locale, "createCollection")}
          </Button>
        </form>
        <ul className="mt-8 space-y-8">
          {collections.map((collection) => (
            <li key={collection.id} className="border-t border-border pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.productIds.length} {t(locale, "productsCount")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-sm"
                  onClick={async () => {
                    const enabled = !collection.shareEnabled;
                    const token = shareCollection(collection.id, enabled);
                    if (enabled && token) {
                      const url = `${window.location.origin}/c/${token}`;
                      await navigator.clipboard.writeText(url);
                      setCopied(collection.id);
                    }
                  }}
                >
                  {collection.shareEnabled ? t(locale, "stopSharing") : t(locale, "shareCollection")}
                </Button>
              </div>
              {copied === collection.id ? (
                <p className="mt-2 text-xs">{t(locale, "copied")}</p>
              ) : null}
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {collection.productIds.map(getProductById).filter(Boolean).map((product) => (
                  <ProductCard key={product!.id} product={product!} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
