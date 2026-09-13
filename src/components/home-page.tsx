"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { buttonVariants } from "@/components/ui/button";
import { products, quickCategories } from "@/content/catalog";
import { media } from "@/content/media";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function HomePage() {
  const { locale } = useStore();
  const newest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const loved = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 4);

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
              className={cn(buttonVariants({ variant: "outline" }), "rounded-sm border-[#F8F6F2] text-[#F8F6F2]")}
            >
              {t(locale, "discoverStory")}
            </Link>
          </div>
        </div>
      </section>

      <section className="reveal px-5 py-10 sm:px-8">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {quickCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-36 shrink-0 sm:w-40"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-muted">
                <Image src={item.image} alt="" fill className="object-cover" sizes="160px" />
              </div>
              <p className="mt-2 text-xs tracking-[0.08em] uppercase">{item.label[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

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

      <section className="reveal mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl">{t(locale, "justLanded")}</h2>
          <Link href="/shop/yeni-koleksiyon" className="text-sm underline">
            {t(locale, "viewAllNew")}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {newest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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

      <section className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-4xl">{t(locale, "mostLoved")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {loved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
