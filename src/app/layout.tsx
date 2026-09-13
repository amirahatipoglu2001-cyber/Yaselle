import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { RegionGate } from "@/components/region-gate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
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
