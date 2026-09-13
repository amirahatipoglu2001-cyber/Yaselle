import { Suspense } from "react";
import { ProductListing } from "@/components/product-listing";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-muted-foreground">…</div>}>
      <ProductListing title="Yaselle" />
    </Suspense>
  );
}
