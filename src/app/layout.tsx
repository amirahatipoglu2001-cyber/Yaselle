import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { DocumentLocale } from "@/components/document-locale";
import { RegionGate } from "@/components/region-gate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { owner } from "@/content/profile";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Yaselle AI",
    template: "%s — Yaselle AI",
  },
  description:
    "Yaselle AI — refined women’s fashion, modest edits, and a human shopping advisor.",
  authors: [{ name: owner.name, url: `mailto:${owner.email}` }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <DocumentLocale />
          <RegionGate />
          <SiteHeader />
          <div id="content" className="flex flex-1 flex-col">
            {children}
          </div>
          <SiteFooter />
          <ChatWidget />
        </StoreProvider>
      </body>
    </html>
  );
}
