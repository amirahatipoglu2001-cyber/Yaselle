"use client";

import { t } from "@/content/i18n";
import { useStore } from "@/lib/store";

const cell =
  "flex h-9 items-center justify-center gap-1.5 border border-border bg-card px-3 text-primary";

function MastercardMark() {
  return (
    <svg viewBox="0 0 36 22" className="h-[18px] w-auto shrink-0" aria-hidden="true">
      <circle cx="13" cy="11" r="8.2" fill="currentColor" opacity="0.28" />
      <circle cx="23" cy="11" r="8.2" fill="currentColor" opacity="0.55" />
      <circle cx="13" cy="11" r="8.2" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="23" cy="11" r="8.2" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PaymentTrustRow() {
  const { locale } = useStore();

  return (
    <div className="border-t border-border bg-background">
      <ul
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-5 py-4"
        aria-label={t(locale, "paymentTrust")}
      >
        <li className={cell}>
          <span className="text-[12px] font-bold italic tracking-[0.22em]">VISA</span>
        </li>
        <li className={cell}>
          <MastercardMark />
          <span className="text-[9px] font-semibold tracking-[0.1em] uppercase">Mastercard</span>
        </li>
        <li className={cell}>
          <span className="text-[12px] font-semibold tracking-[0.04em]">iyzico</span>
        </li>
        <li className={cell}>
          <span className="text-[11px] font-bold tracking-[0.22em]">TROY</span>
        </li>
        <li className={cell}>
          <span className="text-[10px] font-semibold tracking-[0.08em]">Western Union</span>
        </li>
        <li className={cell}>
          <span
            aria-label={t(locale, "payOnDelivery")}
            className="text-[10px] font-semibold tracking-[0.12em] uppercase"
          >
            {t(locale, "cod")}
          </span>
        </li>
      </ul>
    </div>
  );
}
