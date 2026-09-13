import type { MetadataRoute } from "next";
import { categoryTree, products } from "@/content/catalog";
import { siteUrl } from "@/content/site";

const helpSlugs = [
  "size-guide",
  "shipping",
  "payment",
  "returns",
  "contact",
  "satisfaction",
  "privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/shop", "/custom-order"].map((path) => ({
    url: siteUrl(path),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const categories = categoryTree.map((category) => ({
    url: siteUrl(category.href),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const pieces = products.map((product) => ({
    url: siteUrl(`/product/${product.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const help = helpSlugs.map((slug) => ({
    url: siteUrl(`/help/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...categories, ...pieces, ...help];
}
