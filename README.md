# Yaselle

Women’s fashion storefront: editorial home, modest and ready-to-wear edits, listing, product, bag, favorites, and a Yaselle advisor that never invents stock or dates.

The public house is **[yasellefashion.com](https://yasellefashion.com)** — canonical URL `https://yasellefashion.com`, kept in [`src/content/site.ts`](./src/content/site.ts) (`domain` + `url`) and used by metadata, Open Graph, sitemap, and footer.

The house owner is **Amira Hatipoğlu**. Public contact is [`amirahatipoglu2001@gmail.com`](mailto:amirahatipoglu2001@gmail.com) — kept in [`src/content/profile.ts`](./src/content/profile.ts) and used by the UI. Contact, newsletter, custom-order and chatbot handoff open a `mailto:` draft after local validation. There is no mail server in this studio.

The brief is in [`yaselle-plan.md`](./yaselle-plan.md).

## Run

```bash
npm install
npm run dev -- --port 43217 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

On first visit, choose region, country and language (or use location). Preferences stay in the browser. Catalog, bag and favorites are local — no payment provider is attached.

```bash
npm run lint
npm run build
```

## Go live — Vercel + Hostinger DNS

This app is **Next.js**. Hosting is **Vercel**. Hostinger is **DNS only** (`yasellefashion.com` was purchased there). Do not host the site on Hostinger.

If the project is not on GitHub yet, click **Create repo** in Cursor, then import that repo in Vercel.

### 1. Deploy on Vercel

1. Open [vercel.com](https://vercel.com) and sign in (GitHub is simplest).
2. **Add New… → Project** → import this repository.
3. Framework: Next.js (auto-detected). Deploy **Production**.
4. Project → **Settings → Domains** → add `yasellefashion.com` and `www.yasellefashion.com`. Use the A / CNAME values Vercel shows on that screen if they differ from the table below.

### 2. Hostinger DNS (keep Hostinger nameservers)

Do **not** change nameservers to Vercel. Leave:

| Type | Host | Value |
| --- | --- | --- |
| NS | `@` | `aster.dns-parking.com` |
| NS | `@` | `helios.dns-parking.com` |

In Hostinger hPanel → **Domains** → **yasellefashion.com** → **DNS / DNS Zone Editor**, set:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| **A** | `@` | Vercel’s IPv4 (often `76.76.21.21`) | default |
| **CNAME** | `www` | `cname.vercel-dns.com` | default |

Remove Hostinger park / default A, AAAA, and CNAME records for `@` and `www` so they do not conflict. One A for `@`, one CNAME for `www`.

When Vercel marks both domains **Valid**, HTTPS is automatic. Canonical site: `https://yasellefashion.com`.

### E-posta

Site contact is `mailto:` to **amirahatipoglu2001@gmail.com**. Do not change that inbox.

Optional on Hostinger only: forward `info@yasellefashion.com` → `amirahatipoglu2001@gmail.com`. The app does not send mail to that alias.

## Edit the house

- Canonical domain / URL: `src/content/site.ts`
- Owner / contact email: `src/content/profile.ts`
- Products and menus: `src/content/catalog.ts`
- Regions and currencies: `src/content/regions.ts`
- Copy: `src/content/i18n.ts`
- Photographs: remote Unsplash and Pexels URLs in `src/content/media.ts` (no local product photos)
- Wordmark: `public/yaselle-mark.svg`
