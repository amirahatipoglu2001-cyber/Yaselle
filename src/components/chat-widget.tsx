"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/content/catalog";
import { t } from "@/content/i18n";
import { owner } from "@/content/profile";
import { chatHandoffDraft, isValidEmail, openOwnerMail } from "@/lib/mail";
import { useStore } from "@/lib/store";

type Message = { from: "bot" | "you"; text: string };

function reply(locale: "en" | "tr", text: string) {
  const q = text.toLowerCase();
  const wantsSize = q.includes("beden") || q.includes("size") || q.includes("ölçü");
  const wantsShip =
    q.includes("kargo") ||
    q.includes("teslim") ||
    q.includes("ship") ||
    q.includes("deliver");
  const found = products.find(
    (product) =>
      product.name.en.toLowerCase().includes(q) ||
      product.name.tr.toLowerCase().includes(q) ||
      product.subcategory.includes(q),
  );
  if (found && !wantsSize && !wantsShip) {
    return locale === "tr"
      ? `${found.name.tr} için ürün sayfasına bakın — stok ve fiyat orada, ben uydurmam. /product/${found.slug}`
      : `See ${found.name.en} on its product page for live stock and price. I won’t invent either. /product/${found.slug}`;
  }
  const parts: string[] = [];
  if (wantsSize) {
    parts.push(
      locale === "tr"
        ? "Beden tablosu /help/size-guide sayfasında. Emin değilseniz özel dikim /custom-order."
        : "The size guide is at /help/size-guide. Unsure? Start a custom order at /custom-order.",
    );
  }
  if (wantsShip) {
    parts.push(
      locale === "tr"
        ? "Kargo koşulları /help/shipping sayfasında. Tarih uydurmam — güncel süre orada."
        : "Shipping notes live at /help/shipping. I don’t invent dates.",
    );
  }
  if (parts.length > 0) return parts.join(" ");
  if (q.includes("iade") || q.includes("return")) {
    return locale === "tr"
      ? "İade koşulları /help/returns. Hazır giyimde 14 gün; özel dikim ölçü notuna bağlı."
      : "Returns are at /help/returns. 14 days on ready-to-wear; custom follows the fitting note.";
  }
  if (q.includes("dikim") || q.includes("custom") || q.includes("özel")) {
    return locale === "tr"
      ? "Özel dikim üç adım: tasarım, ölçü, üretim. /custom-order"
      : "Custom order is three steps: design, measure, make. /custom-order";
  }
  if (q.includes("sipariş") || q.includes("order")) {
    return locale === "tr"
      ? `Sipariş için ${owner.email} adresine yazın veya /help/contact. Durumu uydurmam.`
      : `For an order, write to ${owner.email} or /help/contact. I won’t invent a status.`;
  }
  return locale === "tr"
    ? `Bunu doğrulayamıyorum. Stok, fiyat veya teslim tarihi uydurmam — ${owner.email} veya /help/contact.`
    : `I can’t verify that. I don’t invent stock, price or dates — write ${owner.email} or /help/contact.`;
}

function ChatText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, index) => {
        const trimmed = part.replace(/[.,;:!?]+$/, "");
        const mark = part.slice(trimmed.length);
        if (trimmed.startsWith("/")) {
          return (
            <span key={index}>
              <Link href={trimmed} className="underline">
                {trimmed}
              </Link>
              {mark}
            </span>
          );
        }
        if (isValidEmail(trimmed)) {
          return (
            <span key={index}>
              <a href={`mailto:${trimmed}`} className="underline">
                {trimmed}
              </a>
              {mark}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function ChatWidget() {
  const { locale } = useStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const hello = t(locale, "chatHello");
  const [messages, setMessages] = useState<Message[]>([]);
  const thread: Message[] =
    messages.length === 0 ? [{ from: "bot", text: hello }] : messages;

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("yaselle-open-chat", openChat);
    return () => window.removeEventListener("yaselle-open-chat", openChat);
  }, []);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((current) => {
      const base = current.length === 0 ? [{ from: "bot" as const, text: hello }] : current;
      return [...base, { from: "you", text }];
    });
    setPending(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { from: "bot", text: reply(locale, text) },
      ]);
      setPending(false);
    }, 400);
  }

  function writeToPerson() {
    const transcript = thread
      .map((message) => `${message.from === "you" ? "You" : "Yaselle"}: ${message.text}`)
      .join("\n");
    const draft = chatHandoffDraft(locale, transcript);
    openOwnerMail(draft.subject, draft.body);
  }

  return (
    <div
      id="yaselle-chat"
      className="fixed right-[max(1rem,env(safe-area-inset-right))] z-40 flex flex-col items-end"
      style={{
        bottom: "max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
      }}
    >
      {open ? (
        <div
          id="yaselle-chat-panel"
          role="dialog"
          aria-labelledby="yaselle-chat-title"
          className="mb-3 flex h-[min(70vh,28rem)] w-[min(92vw,22rem)] flex-col border border-border bg-background shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <p id="yaselle-chat-title" className="text-sm font-medium">
              {t(locale, "chatTitle")}
            </p>
            <button
              type="button"
              className="size-11"
              aria-label={t(locale, "close")}
              onClick={() => setOpen(false)}
            >
              <X className="mx-auto size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {thread.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={message.from === "you" ? "text-right" : "text-left"}
              >
                {message.from === "bot" ? (
                  <span className="mb-1 block text-[10px] font-medium tracking-[0.16em] text-muted-foreground">
                    {t(locale, "chatLabel")}
                  </span>
                ) : null}
                <p className={message.from === "bot" ? "text-muted-foreground" : undefined}>
                  <ChatText text={message.text} />
                </p>
              </div>
            ))}
            {pending ? <p className="text-xs text-muted-foreground">…</p> : null}
          </div>
          <div className="border-t border-border px-3 py-2">
            <p className="text-[11px] text-muted-foreground">{t(locale, "chatHuman")}</p>
            <button
              type="button"
              className="mt-1 text-xs underline underline-offset-4"
              onClick={writeToPerson}
            >
              {t(locale, "writePerson")}
            </button>
          </div>
          <form
            className="flex gap-2 border-t border-border p-2"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t(locale, "chatPlaceholder")}
              className="h-11 rounded-sm"
            />
            <Button type="submit" className="rounded-sm">
              →
            </Button>
          </form>
          <Link href="/help/privacy" className="px-3 pb-2 text-[11px] underline">
            {t(locale, "chatPrivacy")}
          </Link>
        </div>
      ) : null}
      <Button
        type="button"
        className="h-12 gap-1.5 rounded-sm px-3.5"
        aria-label={t(locale, "chatOpen")}
        aria-expanded={open}
        aria-controls="yaselle-chat-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <MessageSquare className="size-5" strokeWidth={2} aria-hidden />
        <span className="text-xs font-semibold tracking-[0.12em]">AI</span>
        <span className="text-xs font-semibold tracking-[0.08em]">{t(locale, "chatTitle")}</span>
      </Button>
    </div>
  );
}
