"use client";

import { Button } from "@/components/ui/button";
import { t } from "@/content/i18n";
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
      <Button className="mt-6 rounded-sm" onClick={reset}>
        {t(locale, "retry")}
      </Button>
    </main>
  );
}
