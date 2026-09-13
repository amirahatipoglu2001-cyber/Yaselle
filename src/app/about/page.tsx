"use client";

import Image from "next/image";
import { t } from "@/content/i18n";
import { media } from "@/content/media";
import { useStore } from "@/lib/store";

export default function AboutPage() {
  const { locale } = useStore();
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <div className="relative mb-10 aspect-4/3 overflow-hidden bg-muted">
        <Image src={media.story} alt="Yaselle" fill className="object-cover" />
      </div>
      <h1 className="font-display text-5xl">{t(locale, "meetYaselle")}</h1>
      <p className="mt-6 text-lg leading-8">{t(locale, "storyTitle")}</p>
      <p className="mt-4 text-base leading-8 text-muted-foreground">{t(locale, "storyBody")}</p>
      <p className="mt-4 text-base leading-8 text-muted-foreground">
        {locale === "tr"
          ? "Yaselle AI bir vitrin değil, danışmanlı bir ev: beden, kumaş ve teslimat net konuşulur. Yapay zekâ stok veya tarih uydurmaz."
          : "Yaselle AI is a house with advice, not a shouting window: fit, cloth and delivery are spoken plainly. The assistant never invents stock or dates."}
      </p>
    </main>
  );
}
