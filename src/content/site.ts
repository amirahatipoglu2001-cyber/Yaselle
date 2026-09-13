/** Canonical public house — import `site` / `siteUrl`; do not hardcode the domain. */
export const site = {
  name: "YASELLE",
  domain: "yasellefashion.com",
  url: "https://yasellefashion.com",
  description:
    "Yaselle — refined women’s fashion, modest edits, and a human shopping advisor.",
} as const;

export type Site = typeof site;

/** Absolute URL on the live house. Paths must start with `/` or be empty. */
export function siteUrl(path = "/"): string {
  if (!path || path === "/") return site.url;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized}`;
}
