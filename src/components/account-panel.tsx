"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export function AccountPanel() {
  const {
    locale,
    panel,
    setPanel,
    sessionEmail,
    signIn,
    createAccount,
    signOut,
    requestReset,
    authError,
    mergeOffer,
    mergeFavorites,
    dismissMerge,
  } = useStore();
  const open = panel === "account";
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(next) => setPanel(next ? "account" : null)}>
      <SheetContent
        side="right"
        className="w-[min(100%,28rem)] bg-background p-0 sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border p-4">
          <SheetTitle>{t(locale, "account")}</SheetTitle>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center"
            aria-label={t(locale, "close")}
            onClick={() => setPanel(null)}
          >
            <X className="size-5" />
          </button>
        </SheetHeader>
        <div className="p-5">
          {sessionEmail ? (
            <div className="space-y-4 text-sm">
              <p>{sessionEmail}</p>
              {mergeOffer ? (
                <div className="border border-border p-4">
                  <p>{t(locale, "mergeFav")}</p>
                  <div className="mt-3 flex gap-2">
                    <Button className="rounded-sm" onClick={mergeFavorites}>
                      {t(locale, "mergeYes")}
                    </Button>
                    <Button variant="outline" className="rounded-sm" onClick={dismissMerge}>
                      {t(locale, "later")}
                    </Button>
                  </div>
                </div>
              ) : null}
              <Link href="/favorites" className="block underline" onClick={() => setPanel(null)}>
                {t(locale, "favorites")}
              </Link>
              <p className="text-muted-foreground">{t(locale, "orders")}: {t(locale, "noOrders")}</p>
              <p className="text-muted-foreground">{t(locale, "addresses")}</p>
              <Button variant="outline" className="rounded-sm" onClick={signOut}>
                {t(locale, "signOut")}
              </Button>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (mode === "in") signIn(email, password);
                else createAccount(email, password);
              }}
            >
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={mode === "in" ? "default" : "outline"}
                  className="rounded-sm"
                  onClick={() => setMode("in")}
                >
                  {t(locale, "signIn")}
                </Button>
                <Button
                  type="button"
                  variant={mode === "up" ? "default" : "outline"}
                  className="rounded-sm"
                  onClick={() => setMode("up")}
                >
                  {t(locale, "createAccount")}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-email">{t(locale, "email")}</Label>
                <Input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-password">{t(locale, "password")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="auth-password"
                    type={show ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-11 rounded-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-sm"
                    onClick={() => setShow((value) => !value)}
                  >
                    {show ? t(locale, "hidePassword") : t(locale, "showPassword")}
                  </Button>
                </div>
              </div>
              {authError === "auth" ? (
                <p role="alert" className="text-sm text-destructive">
                  {t(locale, "authError")}
                </p>
              ) : null}
              {authError === "reset" ? (
                <p role="status" className="text-sm">
                  {t(locale, "resetSent")}
                </p>
              ) : null}
              <Button type="submit" className="w-full rounded-sm">
                {mode === "in" ? t(locale, "signIn") : t(locale, "createAccount")}
              </Button>
              <button
                type="button"
                className="text-xs underline"
                onClick={() => requestReset()}
              >
                {t(locale, "forgot")}
              </button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
