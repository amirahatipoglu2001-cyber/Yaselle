"use client";

import { Button } from "@/components/ui/button";
import { OwnerMailLink } from "@/components/owner-mail-link";
import { t } from "@/content/i18n";
import { site } from "@/content/site";
import { useStore } from "@/lib/store";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useStore();
  return (
    <main className="mx-auto max-w-xl px-5 py-24">
      <h1 className="font-display text-4xl">{t(locale, "errorTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t(locale, "errorBody")}</p>
      <p className="mt-2 text-sm">
        <OwnerMailLink
          subject={locale === "tr" ? "Yaselle — bir şey takıldı" : "Yaselle — something stalled"}
          body={
            locale === "tr"
              ? `${site.domain} üzerinde bir hata sürüyor.\n`
              : `Something stalled on ${site.domain}.\n`
          }
        >
          {t(locale, "writeOwner")}
        </OwnerMailLink>
      </p>
      <Button className="mt-6 rounded-sm" onClick={reset}>
        {t(locale, "retry")}
      </Button>
    </main>
  );
}
