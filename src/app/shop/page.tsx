import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/components/product-listing";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Shop",
  description: "The full Yaselle house — modest, evening, and the pieces in between.",
  alternates: { canonical: "/shop" },
  openGraph: {
    url: "/shop",
    title: `Shop — ${site.name}`,
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-muted-foreground">…</div>}>
      <ProductListing title="Yaselle" />
    </Suspense>
  );
}
