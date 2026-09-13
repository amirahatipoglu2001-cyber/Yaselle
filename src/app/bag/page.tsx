"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getProductById, loc } from "@/content/catalog";
import { t } from "@/content/i18n";
import { formatMoney } from "@/lib/money";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function BagPage() {
  const { locale, country, cart, updateQty, removeLine } = useStore();
  const lines = cart
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((item) => item.product);
  const subtotal = lines.reduce(
    (sum, item) => sum + item.product!.priceTry * item.line.quantity,
    0,
  );

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-display text-4xl">{t(locale, "emptyBag")}</h1>
        <Link href="/shop/yeni-koleksiyon" className={cn(buttonVariants(), "mt-6 rounded-sm")}>
          {t(locale, "exploreNew")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_20rem]">
      <div>
        <h1 className="font-display text-4xl">{t(locale, "cart")}</h1>
        <ul className="mt-8 divide-y divide-border">
          {lines.map(({ line, product }) => (
            <li key={`${line.productId}-${line.size}`} className="flex gap-4 py-6">
              <Image src={product!.images[0]} alt={loc(product!.name, locale)} width={96} height={128} className="object-cover" />
              <div className="flex-1 text-sm">
                <Link href={`/product/${product!.slug}`}>{loc(product!.name, locale)}</Link>
                <p className="text-muted-foreground">
                  {line.size} ·{" "}
                  {(() => {
                    const color = product!.colors.find((c) => c.id === line.colorId);
                    return color ? loc(color.name, locale) : "";
                  })()}
                </p>
                <p className="mt-2">{formatMoney(product!.priceTry, country, locale)}</p>
                <input
                  type="number"
                  min={1}
                  className="mt-2 h-10 w-16 border px-2"
                  value={line.quantity}
                  aria-label={t(locale, "quantity")}
                  onChange={(event) => updateQty(line, Number(event.target.value))}
                />
                <button type="button" className="ml-3 text-xs underline" onClick={() => removeLine(line)}>
                  {t(locale, "remove")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside id="checkout" className="h-fit border border-border p-5">
        <p className="flex justify-between text-sm">
          <span>{t(locale, "subtotal")}</span>
          <span>{formatMoney(subtotal, country, locale)}</span>
        </p>
        <p className="mt-3 text-xs text-muted-foreground">{t(locale, "stockCheck")}</p>
        <Button className="mt-5 w-full rounded-sm">{t(locale, "checkout")}</Button>
      </aside>
    </main>
  );
}
