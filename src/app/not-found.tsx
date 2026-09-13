"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { locale } = useStore();
  return (
    <main className="mx-auto max-w-2xl px-5 py-24">
      <h1 className="font-display text-5xl">{t(locale, "notFoundTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t(locale, "notFoundBody")}</p>
      <Link href="/" className={cn(buttonVariants(), "mt-8 rounded-sm")}>
        {t(locale, "home")}
      </Link>
    </main>
  );
}
