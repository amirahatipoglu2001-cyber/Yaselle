"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getProductById, loc, stockFor, type Product } from "@/content/catalog";
import { saveLabel, t } from "@/content/i18n";
import { formatMoney } from "@/lib/money";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const { locale, country, addToCart, isSaved, toggleSave } = useStore();
  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0];
  const remaining = size ? stockFor(product, size) : 0;
  const look = product.completeTheLook
    .map(getProductById)
    .filter((item): item is Product => Boolean(item));
  const related = product.related
    .map(getProductById)
    .filter((item): item is Product => Boolean(item));
  const hero = product.images[active] || product.images[0];
  const saved = isSaved(product.id);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <nav className="text-xs text-muted-foreground">
        <Link href="/">Yaselle</Link> /{" "}
        <Link href={`/shop/${product.category}`}>{product.category}</Link> /{" "}
        {loc(product.name, locale)}
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-3">
          <button type="button" className="relative aspect-3/4 w-full overflow-hidden bg-muted" onClick={() => setZoom(true)}>
            <Image
              src={hero}
              alt={loc(product.name, locale)}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </button>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={cn(
                  "relative h-20 w-16 shrink-0 overflow-hidden border",
                  index === active ? "border-primary" : "border-transparent",
                )}
                onClick={() => setActive(index)}
              >
                <Image src={image} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="font-display text-4xl">{loc(product.name, locale)}</h1>
          <p className="mt-3 text-lg">
            {product.compareAtTry ? (
              <>
                <span className="mr-2 text-muted-foreground line-through">
                  {formatMoney(product.compareAtTry, country, locale)}
                </span>
                <span className="text-destructive">
                  {formatMoney(product.priceTry, country, locale)}
                </span>
              </>
            ) : (
              formatMoney(product.priceTry, country, locale)
            )}
          </p>
          <fieldset className="mt-6">
            <legend className="text-sm">
              {t(locale, "color")}: {color ? loc(color.name, locale) : ""}
            </legend>
            <div className="mt-2 flex gap-2">
              {product.colors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={loc(item.name, locale)}
                  className={cn(
                    "size-8 border",
                    colorId === item.id ? "border-primary" : "border-border",
                  )}
                  style={{ background: item.hex }}
                  onClick={() => setColorId(item.id)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="flex w-full items-center justify-between text-sm">
              {t(locale, "size")}
              <Link href="/help/size-guide" className="underline">
                {t(locale, "sizeGuide")}
              </Link>
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((item) => {
                const qty = stockFor(product, item);
                return (
                  <button
                    key={item}
                    type="button"
                    disabled={qty <= 0}
                    className={cn(
                      "min-h-11 min-w-11 border px-3 text-sm disabled:opacity-40",
                      size === item ? "border-primary bg-secondary" : "border-border",
                    )}
                    onClick={() => {
                      setSize(item);
                      setSizeError(false);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            {size && remaining > 0 && remaining <= 3 ? (
              <p className="mt-2 text-sm text-destructive">{t(locale, "lowStock")}</p>
            ) : null}
            {size && remaining <= 0 ? (
              <p className="mt-2 text-sm text-destructive">{t(locale, "outOfStock")}</p>
            ) : null}
            {sizeError ? (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {t(locale, "chooseSize")}
              </p>
            ) : null}
          </fieldset>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              className="min-h-11 flex-1 rounded-sm"
              onClick={() => {
                if (!size) {
                  setSizeError(true);
                  return;
                }
                addToCart({
                  productId: product.id,
                  colorId: colorId ?? color?.id ?? product.colors[0]?.id ?? "",
                  size,
                  quantity: 1,
                });
              }}
            >
              {t(locale, "addToBag")}
            </Button>
            <Button
              variant="outline"
              className="min-h-11 rounded-sm"
              onClick={() => toggleSave(product.id)}
            >
              <Heart className={cn("mr-2 size-4", saved && "fill-primary")} />
              {saveLabel(locale, saved)}
            </Button>
          </div>
          {product.tags.includes("custom") ? (
            <Link
              href={`/custom-order?from=${product.slug}`}
              className={cn(buttonVariants({ variant: "ghost" }), "mt-2 w-full rounded-sm")}
            >
              {t(locale, "requestCustom")}
            </Link>
          ) : null}
          <p className="mt-6 text-sm leading-7 text-muted-foreground">
            {t(locale, "deliverySummary")}
          </p>
          <Accordion className="mt-6" multiple={true}>
            <AccordionItem value="details">
              <AccordionTrigger>{t(locale, "details")}</AccordionTrigger>
              <AccordionContent>{loc(product.details, locale)}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit">
              <AccordionTrigger>{t(locale, "fitSize")}</AccordionTrigger>
              <AccordionContent>{loc(product.fit, locale)}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="fabric">
              <AccordionTrigger>{t(locale, "fabricCare")}</AccordionTrigger>
              <AccordionContent>
                {loc(product.fabric, locale)} {loc(product.care, locale)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger>{t(locale, "deliveryReturns")}</AccordionTrigger>
              <AccordionContent>{t(locale, "deliverySummary")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {look.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl">{t(locale, "completeLook")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {look.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl">{t(locale, "alsoLike")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-3xl rounded-sm p-2">
          <div className="relative aspect-3/4 w-full">
            <Image
              src={hero}
              alt={loc(product.name, locale)}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
