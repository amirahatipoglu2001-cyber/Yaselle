"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { buttonVariants } from "@/components/ui/button";
import { products, type Product } from "@/content/catalog";
import { media } from "@/content/media";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function isNewSeason(product: Product) {
  return product.tags.includes("new") || product.collection === "new";
}

function isBestseller(product: Product) {
  return product.tags.includes("bestseller");
}

function isDiscounted(product: Product) {
  return product.tags.includes("sale") || Boolean(product.compareAtTry);
}

function ProductBand({
  title,
  href,
  linkLabel,
  items,
  empty,
}: {
  title: string;
  href: string;
  linkLabel: string;
  items: Product[];
  empty: string;
}) {
  return (
    <section className="reveal mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <h2 className="font-display text-4xl leading-none">{title}</h2>
        <Link href={href} className="shrink-0 text-sm underline underline-offset-4">
          {linkLabel}
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="mt-8 max-w-md text-sm leading-6 text-muted-foreground">{empty}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export function HomePage() {
  const { locale } = useStore();
  const newest = products
    .filter(isNewSeason)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);
  const bestsellers = products
    .filter(isBestseller)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 8);
  const discounted = products
    .filter(isDiscounted)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 8);

  return (
    <main>
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src={media.hero}
          alt="Yaselle 2026 new collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#171717]/55 via-transparent to-[#171717]/15" />
        <div className="hero-copy absolute inset-x-0 bottom-0 max-w-xl p-8 text-[#F8F6F2] sm:p-14">
          <p className="text-[11px] tracking-[0.22em]">{t(locale, "heroKicker")}</p>
          <h1 className="font-display mt-3 text-5xl leading-none sm:text-6xl">
            {t(locale, "heroTitle")}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/shop/yeni-koleksiyon"
              className={cn(buttonVariants(), "rounded-sm bg-[#F8F6F2] text-[#3C2418] hover:bg-white")}
            >
              {t(locale, "shopCollection")}
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-sm border-[#F8F6F2] bg-transparent text-[#F8F6F2] hover:bg-[#F8F6F2]/15 hover:text-[#F8F6F2]",
              )}
            >
              {t(locale, "discoverStory")}
            </Link>
          </div>
        </div>
      </section>

      <ProductBand
        title={t(locale, "homeNewSeason")}
        href="/shop/yeni-koleksiyon"
        linkLabel={t(locale, "viewAllNew")}
        items={newest}
        empty={t(locale, "emptyHomeBand")}
      />
      <ProductBand
        title={t(locale, "homeBestsellers")}
        href="/shop?sort=bestseller"
        linkLabel={t(locale, "viewAllBestsellers")}
        items={bestsellers}
        empty={t(locale, "emptyHomeBand")}
      />
      <ProductBand
        title={t(locale, "homeSale")}
        href="/shop?sort=sale"
        linkLabel={t(locale, "viewAllSale")}
        items={discounted}
        empty={t(locale, "emptyHomeBand")}
      />

      <section className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <Image src={media.story} alt="Yaselle editorial look" fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-display text-4xl leading-tight">{t(locale, "storyTitle")}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{t(locale, "storyBody")}</p>
          <Link href="/about" className={cn(buttonVariants({ variant: "outline" }), "mt-6 rounded-sm")}>
            {t(locale, "meetYaselle")}
          </Link>
        </div>
      </section>

      <section className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">{t(locale, "modestEdit")}</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
            {locale === "tr"
              ? "Abaya, tunik ve takımlar — örtünmenin kendi ritminde durduğu bir edit."
              : "Abayas, tunics and sets — a modest edit that keeps its own rhythm."}
          </p>
          <Link href="/shop/tesettur" className={cn(buttonVariants(), "mt-6 rounded-sm")}>
            {t(locale, "shopModest")}
          </Link>
        </div>
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <Image src={media.modestEdit} alt="Yaselle modest edit" fill className="object-cover" />
        </div>
      </section>

      <section className="reveal border-y border-border px-5 py-16 text-center sm:px-8">
        <p className="text-[11px] tracking-[0.22em] uppercase">{t(locale, "customTitle")}</p>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{t(locale, "customBody")}</p>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 text-sm sm:grid-cols-3">
          <p>1. {t(locale, "customStep1")}</p>
          <p>2. {t(locale, "customStep2")}</p>
          <p>3. {t(locale, "customStep3")}</p>
        </div>
        <Link href="/custom-order" className={cn(buttonVariants(), "mt-8 rounded-sm")}>
          {t(locale, "startCustom")}
        </Link>
      </section>

      <section className="grid gap-6 border-t border-border px-5 py-12 text-center text-sm sm:grid-cols-4 sm:px-8">
        <Link href="/help/payment">{t(locale, "securePay")}</Link>
        <Link href="/help/shipping">{t(locale, "shipping")}</Link>
        <Link href="/help/returns">{t(locale, "returns")}</Link>
        <Link href="/help/contact">{t(locale, "support")}</Link>
      </section>
    </main>
  );
}
