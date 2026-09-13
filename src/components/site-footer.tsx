"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OwnerMailLink } from "@/components/owner-mail-link";
import { t } from "@/content/i18n";
import { owner } from "@/content/profile";
import { site } from "@/content/site";
import { isValidEmail, letterDraft, openOwnerMail } from "@/lib/mail";
import { useStore } from "@/lib/store";
import { LocaleMenu } from "@/components/locale-menu";
import { PaymentTrustRow } from "@/components/payment-trust";

export function SiteFooter() {
  const { locale } = useStore();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  function onJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("err");
      return;
    }
    const draft = letterDraft(locale, email.trim());
    openOwnerMail(draft.subject, draft.body);
    setStatus("ok");
  }

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <h2 className="font-display text-3xl">{t(locale, "letterTitle")}</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {t(locale, "letterBody")}
          </p>
          <form className="mt-4 flex max-w-md gap-2" onSubmit={onJoin}>
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
            <li>
              <OwnerMailLink>{owner.email}</OwnerMailLink>
            </li>
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
        <p>
          © {new Date().getFullYear()} {site.name} · {owner.name} ·{" "}
          <a href={site.url} className="underline-offset-2 hover:underline">
            {site.domain}
          </a>
        </p>
        <div className="flex items-center gap-4">
          <Link href="/help/privacy">{t(locale, "chatPrivacy")}</Link>
          <LocaleMenu />
        </div>
      </div>
      <PaymentTrustRow />
    </footer>
  );
}
