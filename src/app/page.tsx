import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: site.url,
    title: site.name,
    description: site.description,
  },
};

export default function Page() {
  return <HomePage />;
}
