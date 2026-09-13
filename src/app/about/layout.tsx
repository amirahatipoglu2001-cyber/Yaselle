import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Meet Yaselle",
  description: site.description,
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "Meet Yaselle",
    description: site.description,
  },
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
