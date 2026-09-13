import type { MetadataRoute } from "next";
import { categoryTree, products } from "@/content/catalog";
import { site } from "@/content/site";

const helpPages = [
  "size-guide",
  "shipping",
  "payment",
  "returns",
  "contact",
  "satisfaction",
  "privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/shop",
    "/about",
    "/custom-order",
    "/bag",
    "/favorites",
    ...categoryTree.map((category) => category.href),
    ...helpPages.map((slug) => `/help/${slug}`),
    ...products.map((product) => `/product/${product.slug}`),
  ];

  return staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
