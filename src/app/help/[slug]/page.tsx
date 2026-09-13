"use client";

import { FormEvent, use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OwnerMailLink } from "@/components/owner-mail-link";
import { splitCopy, t } from "@/content/i18n";
import { owner } from "@/content/profile";
import { site } from "@/content/site";
import { contactDraft, isValidEmail, openOwnerMail } from "@/lib/mail";
import { useStore } from "@/lib/store";

const pages: Record<
  string,
  { title: { en: string; tr: string }; body: { en: string; tr: string } }
> = {
  "size-guide": {
    title: { en: "Size guide", tr: "Beden tablosu" },
    body: {
      en: "XS–XL follow a modest column. If you sit between sizes, take the larger for tunics and the smaller for jackets. Shoes run true. Custom fit is offered on tagged pieces.",
      tr: "XS–XL ölçülü bir sütunu izler. Aradaysanız tunikte büyüğü, cekette küçüğü alın. Ayakkabı kalıbına sadık. İşaretli parçalarda özel kalıp vardır.",
    },
  },
  shipping: {
    title: { en: "Shipping & delivery", tr: "Kargo & teslimat" },
    body: {
      en: "Ready-to-wear in stock leaves in 2–4 working days. Customs and regional carriers vary by the country you chose in the header. We do not print invented arrival clocks on product pages.",
      tr: "Stoktaki hazır giyim 2–4 iş gününde çıkar. Gümrük ve kargo, başlıktaki ülkeye göre değişir. Ürün sayfasında uydurma teslim saati yoktur.",
    },
  },
  payment: {
    title: { en: "Payment", tr: "Ödeme" },
    body: {
      en: "Cards and regional methods are encrypted at checkout. This studio confirms price and stock again before you pay.",
      tr: "Kart ve bölgesel yöntemler ödeme anında şifrelenir. Fiyat ve stok ödemeden önce yeniden doğrulanır.",
    },
  },
  returns: {
    title: { en: "Returns", tr: "İade" },
    body: {
      en: "Unworn ready-to-wear can come home within 14 days. Custom orders follow the fitting note and are not returned for a change of mind.",
      tr: "Giyilmemiş hazır giyim 14 gün içinde dönebilir. Özel dikim ölçü notunu izler; fikir değişikliğiyle iade edilmez.",
    },
  },
  contact: {
    title: { en: "Contact", tr: "İletişim" },
    body: {
      en: `Write {email} — Amira reads it. The live house is ${site.domain}. The chatbot will hand you here when a fact isn’t on the site.`,
      tr: `{email} — Amira okur. Canlı site ${site.domain}. Sitede olmayan bir konuda sohbet sizi buraya bırakır.`,
    },
  },
  satisfaction: {
    title: { en: "Client care", tr: "Müşteri memnuniyeti" },
    body: {
      en: "If a piece fails the cloth or the fit we described, we make it right. No countdown timers, no fake scarcity. Write to Amira at {email}.",
      tr: "Kumaş veya kalıp tarif ettiğimiz gibi değilse düzeltiriz. Geri sayım yok, sahte kıtlık yok. Amira’ya {email} adresinden yazın.",
    },
  },
  privacy: {
    title: { en: "Privacy", tr: "Gizlilik" },
    body: {
      en: `The live house is ${site.domain}. Region and language live in local storage. Location is requested only if you tap Use my location, and only to suggest a country. Chat does not keep a remote transcript in this studio slice.`,
      tr: `Canlı site ${site.domain}. Bölge ve dil cihazınızda tutulur. Konum yalnızca “Konumumu kullan” derseniz ve ülke önermek için istenir. Bu dilimde sohbet uzak bir kayda yazılmaz.`,
    },
  },
};

function ContactForm() {
  const { locale } = useStore();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !message.trim() || !isValidEmail(from)) {
      setStatus("err");
      return;
    }
    const draft = contactDraft(locale, {
      name: name.trim(),
      from: from.trim(),
      message: message.trim(),
    });
    openOwnerMail(draft.subject, draft.body);
    setStatus("ok");
  }

  return (
    <form className="mt-10 space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="contact-name">{t(locale, "yourName")}</Label>
        <Input
          id="contact-name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-11 rounded-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-mail">{t(locale, "email")}</Label>
        <Input
          id="contact-mail"
          type="email"
          required
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          className="h-11 rounded-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{t(locale, "message")}</Label>
        <Textarea
          id="contact-message"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-32 rounded-sm"
        />
      </div>
      <Button type="submit" className="rounded-sm">
        {t(locale, "openMail")}
      </Button>
      {status === "ok" ? (
        <p className="text-sm">{t(locale, "mailOpensHint")}</p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm text-destructive">{t(locale, "letterError")}</p>
      ) : null}
    </form>
  );
}

function HelpBody({ text }: { text: string }) {
  const parts = splitCopy(text, "email");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 ? <OwnerMailLink /> : null}
        </span>
      ))}
    </>
  );
}

export default function HelpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale } = useStore();
  const page = pages[slug];
  if (!page) {
    return (
      <main className="px-5 py-20">
        <h1 className="font-display text-4xl">{t(locale, "notFoundTitle")}</h1>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-4xl">{page.title[locale]}</h1>
      <p className="mt-6 text-base leading-8 text-muted-foreground">
        <HelpBody text={page.body[locale]} />
      </p>
      {slug === "contact" ? (
        <>
          <p className="mt-4 text-sm">
            <OwnerMailLink>{owner.email}</OwnerMailLink>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{t(locale, "mailOpensHint")}</p>
          <ContactForm />
        </>
      ) : null}
    </main>
  );
}
