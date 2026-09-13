"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProductById, loc } from "@/content/catalog";
import { t } from "@/content/i18n";
import { formatMoney } from "@/lib/money";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { locale, country, panel, setPanel, cart, updateQty, removeLine } = useStore();
  const open = panel === "cart";
  const lines = cart
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((item) => item.product);
  const subtotal = lines.reduce(
    (sum, item) => sum + item.product!.priceTry * item.line.quantity,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={(next) => setPanel(next ? "cart" : null)}>
      <SheetContent
        side="right"
        className="w-[min(100%,28rem)] bg-background p-0 sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border p-4">
          <SheetTitle>{t(locale, "cart")}</SheetTitle>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center"
            aria-label={t(locale, "close")}
            onClick={() => setPanel(null)}
          >
            <X className="size-5" />
          </button>
        </SheetHeader>
        <div className="flex h-full flex-col">
          {lines.length === 0 ? (
            <div className="p-6">
              <p className="font-display text-2xl">{t(locale, "emptyBag")}</p>
              <Link
                href="/shop/yeni-koleksiyon"
                className={cn(buttonVariants(), "mt-6 rounded-sm")}
                onClick={() => setPanel(null)}
              >
                {t(locale, "exploreNew")}
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 space-y-4 overflow-y-auto p-4">
                {lines.map(({ line, product }) => (
                  <li key={`${line.productId}-${line.size}-${line.colorId}`} className="flex gap-3">
                    <Image
                      src={product!.images[0]}
                      alt={loc(product!.name, locale)}
                      width={72}
                      height={96}
                      className="h-24 w-18 object-cover"
                    />
                    <div className="flex-1 text-sm">
                      <p>{loc(product!.name, locale)}</p>
                      <p className="text-muted-foreground">
                        {(() => {
                          const color = product!.colors.find((item) => item.id === line.colorId);
                          return color ? loc(color.name, locale) : "";
                        })()} · {line.size}
                      </p>
                      <p className="mt-1">{formatMoney(product!.priceTry, country, locale)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="sr-only" htmlFor={`qty-${line.productId}-${line.size}`}>
                          {t(locale, "quantity")}
                        </label>
                        <input
                          id={`qty-${line.productId}-${line.size}`}
                          type="number"
                          min={1}
                          className="h-9 w-14 border border-input bg-transparent px-2"
                          value={line.quantity}
                          onChange={(event) =>
                            updateQty(line, Number(event.target.value))
                          }
                        />
                        <button
                          type="button"
                          className="text-xs underline"
                          onClick={() => removeLine(line)}
                        >
                          {t(locale, "remove")}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border p-4">
                <p className="flex justify-between text-sm">
                  <span>{t(locale, "subtotal")}</span>
                  <span>{formatMoney(subtotal, country, locale)}</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{t(locale, "stockCheck")}</p>
                <Link
                  href="/bag"
                  className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full rounded-sm")}
                  onClick={() => setPanel(null)}
                >
                  {t(locale, "viewBag")}
                </Link>
                <Link
                  href="/bag#checkout"
                  className={cn(buttonVariants(), "mt-2 w-full rounded-sm")}
                  onClick={() => setPanel(null)}
                >
                  {t(locale, "checkout")}
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
