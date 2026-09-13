"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";
import { LocaleMenu } from "@/components/locale-menu";

export function SiteFooter() {
  const { locale, newsletterJoin } = useStore();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <h2 className="font-display text-3xl">{t(locale, "letterTitle")}</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {t(locale, "letterBody")}
          </p>
          <form
            className="mt-4 flex max-w-md gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus(newsletterJoin(email) ? "ok" : "err");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t(locale, "email")}
              aria-label={t(locale, "email")}
              className="h-11 rounded-sm"
            />
            <Button type="submit" className="rounded-sm">
              {t(locale, "join")}
            </Button>
          </form>
          {status === "ok" ? (
            <p className="mt-2 text-sm">{t(locale, "letterThanks")}</p>
          ) : null}
          {status === "err" ? (
            <p className="mt-2 text-sm text-destructive">{t(locale, "letterError")}</p>
          ) : null}
        </div>
        <div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {t(locale, "footerCare")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/help/contact">{t(locale, "support")}</Link></li>
            <li><Link href="/help/shipping">{t(locale, "shipping")}</Link></li>
            <li><Link href="/help/returns">{t(locale, "returns")}</Link></li>
            <li><Link href="/help/payment">{t(locale, "securePay")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {t(locale, "footerShop")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shop/yeni-koleksiyon">{t(locale, "justLanded")}</Link></li>
            <li><Link href="/shop/tesettur">{t(locale, "modestEdit")}</Link></li>
            <li><Link href="/custom-order">{t(locale, "startCustom")}</Link></li>
            <li><Link href="/about">{t(locale, "meetYaselle")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Yaselle AI</p>
        <div className="flex items-center gap-4">
          <Link href="/help/privacy">{t(locale, "chatPrivacy")}</Link>
          <LocaleMenu />
        </div>
      </div>
    </footer>
  );
}
