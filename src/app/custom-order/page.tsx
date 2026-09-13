"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/content/i18n";
import { customOrderDraft, isValidEmail, openOwnerMail } from "@/lib/mail";
import { useStore } from "@/lib/store";

export default function CustomOrderPage() {
  const { locale } = useStore();
  const [piece, setPiece] = useState("");
  const [notes, setNotes] = useState("");
  const [from, setFrom] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!piece.trim() || !notes.trim() || !isValidEmail(from)) {
      setError(true);
      return;
    }
    const draft = customOrderDraft(locale, {
      piece: piece.trim(),
      notes: notes.trim(),
      from: from.trim(),
    });
    openOwnerMail(draft.subject, draft.body);
    setError(false);
    setSent(true);
  }

  if (sent) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20">
        <h1 className="font-display text-4xl">{t(locale, "customThanksTitle")}</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {t(locale, "customThanksBody")}
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
      <p className="mt-6 text-sm text-muted-foreground">{t(locale, "mailOpensHint")}</p>
      <form className="mt-10 space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="piece">{locale === "tr" ? "Parça" : "Piece"}</Label>
          <Input
            id="piece"
            required
            value={piece}
            onChange={(event) => setPiece(event.target.value)}
            className="h-11 rounded-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">{locale === "tr" ? "Ölçü ve not" : "Measure notes"}</Label>
          <Textarea
            id="notes"
            required
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-h-32 rounded-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mail">{t(locale, "email")}</Label>
          <Input
            id="mail"
            type="email"
            required
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="h-11 rounded-sm"
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive">{t(locale, "letterError")}</p>
        ) : null}
        <Button type="submit" className="rounded-sm">
          {t(locale, "openMail")}
        </Button>
      </form>
    </main>
  );
}
