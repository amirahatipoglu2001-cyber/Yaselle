"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { saveLabel } from "@/content/i18n";
import { useStore } from "@/lib/store";
import type { Product } from "@/content/catalog";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { locale, country, isSaved, toggleSave } = useStore();
  const sale = Boolean(product.compareAtTry);
  const saved = isSaved(product.id);

  return (
    <article className="group">
      <div className="relative aspect-3/4 overflow-hidden bg-muted">
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={product.name[locale]}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-opacity duration-200 group-hover:opacity-0"
          />
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </Link>
        {sale ? (
          <span className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] tracking-[0.16em] text-destructive uppercase">
            {locale === "tr" ? "İndirim" : "Sale"}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <Link href={`/product/${product.slug}`} className="min-w-0">
          <h3 className="text-sm leading-5">{product.name[locale]}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.colors[0]?.name[locale]}
          </p>
          <p className="mt-1 text-sm">
            {sale ? (
              <>
                <span className="mr-2 text-muted-foreground line-through">
                  {formatMoney(product.compareAtTry!, country, locale)}
                </span>
                <span className="text-destructive">
                  {formatMoney(product.priceTry, country, locale)}
                </span>
              </>
            ) : (
              formatMoney(product.priceTry, country, locale)
            )}
          </p>
        </Link>
        <button
          type="button"
          className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center"
          aria-label={saveLabel(locale, saved)}
          onClick={() => toggleSave(product.id)}
        >
          <Heart
            className={cn("size-4", saved && "fill-primary text-primary")}
          />
        </button>
      </div>
    </article>
  );
}
