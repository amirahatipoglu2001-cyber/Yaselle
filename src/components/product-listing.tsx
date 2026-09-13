"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  categoryTree,
  isInStock,
  products,
  productInCategory,
  sortOptions,
  type SortId,
  categoryLabel,
} from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export function ProductListing({
  category,
  title,
  intro,
}: {
  category?: string;
  title: string;
  intro?: string;
}) {
  const { locale } = useStore();
  const heading =
    categoryTree.find((item) => item.id === category)?.label[locale] ?? title;
  const blurb =
    intro ??
    (category === "tesettur"
      ? t(locale, "tesetturIntro")
      : category
        ? undefined
        : t(locale, "shopIntro"));
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filterOpen, setFilterOpen] = useState(false);
  const [cols, setCols] = useState<2 | 3 | 4>(4);

  const sort = (params.get("sort") as SortId) || "newest";
  const sub = params.get("sub") ?? "";
  const size = params.get("size") ?? "";
  const color = params.get("color") ?? "";
  const material = params.get("material") ?? "";
  const collection = params.get("collection") ?? "";
  const q = params.get("q") ?? "";
  const sale = params.get("sale") === "1";
  const stock = params.get("stock") === "1";
  const min = Number(params.get("min") ?? 0);
  const max = Number(params.get("max") ?? 30000);

  function setQuery(next: Record<string, string | undefined>) {
    const copy = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value) copy.delete(key);
      else copy.set(key, value);
    }
    const query = copy.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const list = useMemo(() => {
    let next = products.filter((product) => productInCategory(product, category, sub || undefined));
    if (q) {
      const query = q.toLowerCase();
      next = next.filter(
        (product) =>
          product.name.en.toLowerCase().includes(query) ||
          product.name.tr.toLowerCase().includes(query),
      );
    }
    if (size) next = next.filter((product) => (product.stock[size] ?? 0) > 0);
    if (color) next = next.filter((product) => product.colors.some((item) => item.id === color));
    if (material) next = next.filter((product) => product.materials.includes(material));
    if (collection) next = next.filter((product) => product.collection === collection);
    if (sale || sort === "sale") {
      next = next.filter((product) => Boolean(product.compareAtTry) || product.tags.includes("sale"));
    }
    if (stock) next = next.filter(isInStock);
    next = next.filter((product) => product.priceTry >= min && product.priceTry <= max);

    const sorted = [...next];
    switch (sort) {
      case "in-stock":
        sorted.sort((a, b) => Number(isInStock(b)) - Number(isInStock(a)));
        break;
      case "bestseller":
        sorted.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.priceTry - a.priceTry);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.priceTry - b.priceTry);
        break;
      case "sale":
        sorted.sort((a, b) => Number(Boolean(b.compareAtTry)) - Number(Boolean(a.compareAtTry)));
        break;
      default:
        sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return sorted;
  }, [category, sub, q, size, color, material, collection, sale, stock, min, max, sort]);

  const chips = [
    sub && { key: "sub", label: categoryLabel(sub, locale) },
    size && { key: "size", label: size },
    color && { key: "color", label: color },
    material && { key: "material", label: material },
    collection && { key: "collection", label: collection },
    sale && { key: "sale", label: t(locale, "saleOnly") },
    stock && { key: "stock", label: t(locale, "inStockOnly") },
  ].filter(Boolean) as { key: string; label: string }[];

  const filterBody = (
    <div className="space-y-6 text-sm">
      <fieldset>
        <legend className="text-[11px] tracking-[0.16em] uppercase">{t(locale, "subcategory")}</legend>
        <div className="mt-2 flex flex-col gap-2">
          {(categoryTree.find((item) => item.id === category)?.children ?? []).map((child) => (
            <label key={child.id} className="flex items-center gap-2">
              <Checkbox
                checked={sub === child.id}
                onCheckedChange={() =>
                  setQuery({ sub: sub === child.id ? undefined : child.id })
                }
              />
              {child.label[locale]}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-[11px] tracking-[0.16em] uppercase">{t(locale, "size")}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL", "36", "37", "38", "39", "40"].map((item) => (
            <Button
              key={item}
              size="sm"
              variant={size === item ? "default" : "outline"}
              className="rounded-sm"
              onClick={() => setQuery({ size: size === item ? undefined : item })}
            >
              {item}
            </Button>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2">
        <Checkbox checked={sale} onCheckedChange={(checked) => setQuery({ sale: checked ? "1" : undefined })} />
        {t(locale, "saleOnly")}
      </label>
      <label className="flex items-center gap-2">
        <Checkbox checked={stock} onCheckedChange={(checked) => setQuery({ stock: checked ? "1" : undefined })} />
        {t(locale, "inStockOnly")}
      </label>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <p className="text-sm text-muted-foreground">
        {list.length} {t(locale, "productsCount")}
      </p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl">{heading}</h1>
      {blurb ? <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{blurb}</p> : null}

      {(categoryTree.find((item) => item.id === category)?.children ?? []).length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {(categoryTree.find((item) => item.id === category)?.children ?? []).map((child) => (
            <button
              key={child.id}
              type="button"
              className={
                sub === child.id
                  ? "min-h-9 border border-primary bg-primary px-3 text-xs text-primary-foreground"
                  : "min-h-9 border border-border px-3 text-xs"
              }
              onClick={() => setQuery({ sub: sub === child.id ? undefined : child.id })}
            >
              {child.label[locale]}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button className="rounded-sm md:hidden" variant="outline" onClick={() => setFilterOpen(true)}>
            {t(locale, "filters")}
          </Button>
          <label className="flex items-center gap-2 text-sm">
            {t(locale, "sort")}
            <select
              className="h-11 border border-input bg-transparent px-2 text-sm"
              value={sort}
              onChange={(event) => setQuery({ sort: event.target.value })}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label[locale]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="hidden items-center gap-2 text-sm md:flex">
          {t(locale, "grid")}
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              className="size-11 border border-border"
              onClick={() => setCols(count as 2 | 3 | 4)}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {chips.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className="min-h-9 border border-border px-3 text-xs"
              onClick={() => setQuery({ [chip.key]: undefined })}
            >
              {chip.label} ×
            </button>
          ))}
          <button type="button" className="text-xs underline" onClick={() => router.replace(pathname)}>
            {t(locale, "clearAll")}
          </button>
        </div>
      ) : null}

      <div className="mt-8 grid gap-8 md:grid-cols-[14rem_1fr]">
        <aside className="hidden md:block">{filterBody}</aside>
        {list.length === 0 ? (
          <div>
            <p>{t(locale, "noResults")}</p>
            <Button className="mt-4 rounded-sm" variant="outline" onClick={() => router.replace(pathname)}>
              {t(locale, "clearAll")}
            </Button>
          </div>
        ) : (
          <div
            className={
              cols === 2
                ? "grid grid-cols-2 gap-x-4 gap-y-10"
                : cols === 3
                  ? "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3"
                  : "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4"
            }
          >
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="left" className="bg-background sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>{t(locale, "filters")}</SheetTitle>
          </SheetHeader>
          <div className="p-4">{filterBody}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
