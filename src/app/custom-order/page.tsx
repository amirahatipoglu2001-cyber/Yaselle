"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export default function CustomOrderPage() {
  const { locale } = useStore();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20">
        <h1 className="font-display text-4xl">
          {locale === "tr" ? "Talebiniz alındı." : "Your request is with the atelier."}
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {locale === "tr"
            ? "Ölçü notu için e-posta ile yazacağız. Stok veya teslim tarihi şimdi uydurulmaz."
            : "We’ll write for measurements. We won’t invent a delivery date here."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <p className="text-[11px] tracking-[0.2em] uppercase">{t(locale, "customTitle")}</p>
      <h1 className="font-display mt-3 text-4xl">{t(locale, "startCustom")}</h1>
      <ol className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
        <li>1. {t(locale, "customStep1")}</li>
        <li>2. {t(locale, "customStep2")}</li>
        <li>3. {t(locale, "customStep3")}</li>
      </ol>
      <form
        className="mt-10 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="piece">{locale === "tr" ? "Parça" : "Piece"}</Label>
          <Input id="piece" required className="h-11 rounded-sm" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">{locale === "tr" ? "Ölçü ve not" : "Measure notes"}</Label>
          <Textarea id="notes" required className="min-h-32 rounded-sm" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mail">{t(locale, "email")}</Label>
          <Input id="mail" type="email" required className="h-11 rounded-sm" />
        </div>
        <Button type="submit" className="rounded-sm">
          {t(locale, "startCustom")}
        </Button>
      </form>
    </main>
  );
}
