"use client";

import { use } from "react";
import { t } from "@/content/i18n";
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
      en: "Write care@yaselle.ai — a person reads it. The chatbot will hand you here when a fact isn’t on the site.",
      tr: "care@yaselle.ai — bir insan okur. Sitede olmayan bir konuda sohbet sizi buraya bırakır.",
    },
  },
  satisfaction: {
    title: { en: "Client care", tr: "Müşteri memnuniyeti" },
    body: {
      en: "If a piece fails the cloth or the fit we described, we make it right. No countdown timers, no fake scarcity.",
      tr: "Kumaş veya kalıp tarif ettiğimiz gibi değilse düzeltiriz. Geri sayım yok, sahte kıtlık yok.",
    },
  },
  privacy: {
    title: { en: "Privacy", tr: "Gizlilik" },
    body: {
      en: "Region and language live in local storage. Location is requested only if you tap Use my location, and only to suggest a country. Chat does not keep a remote transcript in this studio slice.",
      tr: "Bölge ve dil cihazınızda tutulur. Konum yalnızca “Konumumu kullan” derseniz ve ülke önermek için istenir. Bu dilimde sohbet uzak bir kayda yazılmaz.",
    },
  },
};

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
      <p className="mt-6 text-base leading-8 text-muted-foreground">{page.body[locale]}</p>
    </main>
  );
}
