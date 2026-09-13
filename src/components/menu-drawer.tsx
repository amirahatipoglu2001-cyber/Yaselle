"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categoryTree, menuExtras } from "@/content/catalog";
import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

export function MenuDrawer() {
  const { locale, panel, setPanel } = useStore();
  const router = useRouter();
  const open = panel === "menu";
  const closeRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setPanel]);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => setPanel(next ? "menu" : null)}
    >
      <SheetContent
        side="left"
        className="w-[min(100%,28rem)] bg-background p-0 sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border p-4">
          <SheetTitle className="font-display tracking-[0.2em]">
            YASELLE AI
          </SheetTitle>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex size-11 items-center justify-center"
            aria-label={t(locale, "close")}
            onClick={() => setPanel(null)}
          >
            <X className="size-5" />
          </button>
        </SheetHeader>
        <div className="overflow-y-auto p-4 pb-16">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(locale, "searchPlaceholder")}
            className="h-11 rounded-sm"
            onKeyDown={(event) => {
              if (event.key === "Enter" && query.trim()) {
                router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
                setPanel(null);
              }
            }}
          />
          <Accordion className="mt-6">
            <AccordionItem value="categories">
              <AccordionTrigger className="rounded-none py-3 text-sm tracking-[0.08em] uppercase">
                {t(locale, "categories")}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pb-2">
                  {categoryTree.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={category.href}
                        className="font-medium"
                        onClick={() => setPanel(null)}
                      >
                        {category.label[locale]}
                      </Link>
                      {category.children.length > 0 ? (
                        <ul className="mt-2 space-y-1 pl-3 text-sm text-muted-foreground">
                          {category.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={`${category.href}?sub=${child.id}`}
                                onClick={() => setPanel(null)}
                              >
                                {child.label[locale]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <nav className="mt-2 flex flex-col">
            {menuExtras.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center justify-between border-b border-border text-sm"
                onClick={() => setPanel(null)}
              >
                {item.label[locale]}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
            <button
              type="button"
              className="mt-6 min-h-11 text-left text-sm underline underline-offset-4"
              onClick={() => setPanel("account")}
            >
              {t(locale, "signInCreate")}
            </button>
            <button
              type="button"
              className="min-h-11 text-left text-sm underline underline-offset-4"
              onClick={() => {
                setPanel(null);
                document.getElementById("yaselle-chat")?.scrollIntoView();
                window.dispatchEvent(new Event("yaselle-open-chat"));
              }}
            >
              Yaselle AI Chatbot Destek
            </button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
