import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/product-listing";
import { categoryTree } from "@/content/catalog";
import { site } from "@/content/site";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categoryTree.map((item) => ({ category: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryTree.find((item) => item.id === category);
  const title = meta?.label.en ?? "Shop";
  const path = `/shop/${category}`;
  return {
    title,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = categoryTree.find((item) => item.id === category);
  if (!meta) notFound();

  return (
    <Suspense fallback={<div className="p-10">…</div>}>
      <ProductListing
        category={category}
        title={meta.label.en}
      />
    </Suspense>
  );
}
