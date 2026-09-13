"use client";

import { use } from "react";
import { ProductCard } from "@/components/product-card";
import { getProductById } from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export default function SharedCollectionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const { collections, locale, hydrated } = useStore();
  const collection = collections.find(
    (item) => item.shareEnabled && item.shareToken === token,
  );

  if (!hydrated) {
    return <main className="p-10 text-sm text-muted-foreground">…</main>;
  }

  if (!collection) {
    return (
      <main className="px-5 py-20">
        <h1 className="font-display text-4xl">{t(locale, "notFoundTitle")}</h1>
      </main>
    );
  }

  const items = collection.productIds.map(getProductById).filter(Boolean);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-4xl">{collection.name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t(locale, "shareNote")}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product!.id} product={product!} />
        ))}
      </div>
    </main>
  );
}
