import type { Locale } from "@/content/catalog";
import { owner } from "@/content/profile";

/** Local validation only — this studio does not send mail. */
export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ownerMailto(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  // Some mail clients mishandle `+` for spaces; keep RFC 3986 encoding.
  return `mailto:${owner.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export function openOwnerMail(subject: string, body: string) {
  if (typeof window === "undefined") return;
  window.location.assign(ownerMailto(subject, body));
}

export function contactDraft(
  locale: Locale,
  fields: { name: string; from: string; message: string },
) {
  const subject =
    locale === "tr" ? "Yaselle — iletişim" : "Yaselle — contact";
  const body =
    locale === "tr"
      ? `Ad: ${fields.name}\nYanıt adresi: ${fields.from}\n\n${fields.message}\n`
      : `Name: ${fields.name}\nReply to: ${fields.from}\n\n${fields.message}\n`;
  return { subject, body };
}

export function letterDraft(locale: Locale, subscriberEmail: string) {
  const subject =
    locale === "tr"
      ? "Yaselle Letter — katılım"
      : "Yaselle Letter — join request";
  const body =
    locale === "tr"
      ? `Yaselle Letter’a katılmak istiyorum.\n\nE-posta: ${subscriberEmail}\n`
      : `Please add me to The Yaselle Letter.\n\nEmail: ${subscriberEmail}\n`;
  return { subject, body };
}

export function customOrderDraft(
  locale: Locale,
  fields: { piece: string; notes: string; from: string },
) {
  const subject =
    locale === "tr" ? "Yaselle — özel dikim" : "Yaselle — custom order";
  const body =
    locale === "tr"
      ? `Parça: ${fields.piece}\nYanıt adresi: ${fields.from}\n\nÖlçü ve not:\n${fields.notes}\n`
      : `Piece: ${fields.piece}\nReply to: ${fields.from}\n\nMeasure notes:\n${fields.notes}\n`;
  return { subject, body };
}

export function chatHandoffDraft(locale: Locale, transcript: string) {
  const subject =
    locale === "tr"
      ? "Yaselle — bir insana yaz"
      : "Yaselle — write to a person";
  const body =
    locale === "tr"
      ? `Yaselle AI sohbetinden bir insana yazıyorum.\n\n${transcript}\n`
      : `Writing from the Yaselle AI chat to a person.\n\n${transcript}\n`;
  return { subject, body };
}

export function accountHelpDraft(locale: Locale, from?: string) {
  const subject =
    locale === "tr" ? "Yaselle — hesap yardımı" : "Yaselle — account help";
  const body =
    locale === "tr"
      ? `Hesap konusunda yardıma ihtiyacım var.${from ? `\n\nHesap e-postası: ${from}` : ""}\n`
      : `I need help with my Yaselle account.${from ? `\n\nAccount email: ${from}` : ""}\n`;
  return { subject, body };
}
