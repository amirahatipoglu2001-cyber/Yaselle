import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { DocumentLocale } from "@/components/document-locale";
import { RegionGate } from "@/components/region-gate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { owner } from "@/content/profile";
import { site } from "@/content/site";
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
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: owner.name, url: `mailto:${owner.email}` }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
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
