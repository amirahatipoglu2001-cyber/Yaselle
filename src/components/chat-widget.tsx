"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

type Message = { from: "bot" | "you"; text: string };

function reply(locale: "en" | "tr", text: string) {
  const q = text.toLowerCase();
  const found = products.find(
    (product) =>
      product.name.en.toLowerCase().includes(q) ||
      product.name.tr.toLowerCase().includes(q) ||
      product.subcategory.includes(q),
  );
  if (found) {
    return locale === "tr"
      ? `${found.name.tr} için ürün sayfasına bakın — stok ve fiyat orada, ben uydurmam. /product/${found.slug}`
      : `See ${found.name.en} on its product page for live stock and price. I won’t invent either. /product/${found.slug}`;
  }
  if (q.includes("beden") || q.includes("size") || q.includes("ölçü")) {
    return locale === "tr"
      ? "Beden tablosu /help/size-guide sayfasında. Emin değilseniz özel dikim /custom-order."
      : "The size guide is at /help/size-guide. Unsure? Start a custom order at /custom-order.";
  }
  if (q.includes("kargo") || q.includes("teslim") || q.includes("ship") || q.includes("deliver")) {
    return locale === "tr"
      ? "Kargo koşulları /help/shipping sayfasında. Tarih uydurmam — güncel süre orada."
      : "Shipping notes live at /help/shipping. I don’t invent dates.";
  }
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
      ? "Sipariş için hesabınızdan veya /help/contact üzerinden insan desteğine yazın. Durumu uydurmam."
      : "For an order, write via /help/contact. I won’t invent a status.";
  }
  return locale === "tr"
    ? "Bunu doğrulayamıyorum. Stok, fiyat veya teslim tarihi uydurmam — /help/contact üzerinden insan desteği."
    : "I can’t verify that. I don’t invent stock, price or dates — write via /help/contact.";
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

  return (
    <div id="yaselle-chat" className="fixed right-4 bottom-4 z-40">
      {open ? (
        <div className="mb-3 flex h-[min(70vh,28rem)] w-[min(92vw,22rem)] flex-col border border-border bg-background shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <p className="text-sm">Yaselle AI</p>
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
              <p
                key={`${message.from}-${index}`}
                className={message.from === "you" ? "text-right" : "text-left text-muted-foreground"}
              >
                {message.text.split(" ").map((word, wordIndex) =>
                  word.startsWith("/") ? (
                    <Link key={wordIndex} href={word} className="underline">
                      {word}{" "}
                    </Link>
                  ) : (
                    <span key={wordIndex}>{word} </span>
                  ),
                )}
              </p>
            ))}
            {pending ? <p className="text-xs text-muted-foreground">…</p> : null}
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
        className="size-12 rounded-sm"
        aria-label={t(locale, "chatOpen")}
        onClick={() => setOpen((value) => !value)}
      >
        <MessageCircle className="size-5" />
      </Button>
    </div>
  );
}
