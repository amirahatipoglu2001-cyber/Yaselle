# Yaselle AI

Women’s fashion storefront: editorial home, modest and ready-to-wear edits, listing, product, bag, favorites, and a Yaselle AI advisor that never invents stock or dates.

The house owner is **Amira Hatipoğlu**. Public contact is [`amirahatipoglu2001@gmail.com`](mailto:amirahatipoglu2001@gmail.com) — kept in [`src/content/profile.ts`](./src/content/profile.ts) and used by the UI. Contact, newsletter, custom-order and chatbot handoff open a `mailto:` draft after local validation. There is no mail server in this studio.

The canonical public domain is **[yasellefashion.com](https://yasellefashion.com)** (Hostinger). The Next.js storefront is meant to run on **Vercel**; Hostinger holds DNS only. Until DNS points at a deploy, use the local Preview URL below.

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

## Edit the house

- Owner / contact email: `src/content/profile.ts`
- Public domain: `src/content/site.ts`
- Products and menus: `src/content/catalog.ts`
- Regions and currencies: `src/content/regions.ts`
- Copy: `src/content/i18n.ts`
- Photographs: remote Unsplash and Pexels URLs in `src/content/media.ts` (no local product photos)
- Wordmark: `public/yaselle-mark.svg`

## Go live (Hostinger domain + Vercel)

1. Put this repo on GitHub, then import it at [vercel.com](https://vercel.com) (no environment variables required).
2. In Vercel → Project → Settings → Domains, add `yasellefashion.com` and `www.yasellefashion.com`.
3. Copy the A and CNAME values Vercel shows.
4. In Hostinger hPanel → Domains → yasellefashion.com → DNS / DNS Zone, keep Hostinger nameservers and set:
   - `A` `@` → the IPv4 Vercel listed (often `76.76.21.21`)
   - `CNAME` `www` → the host Vercel listed (often `cname.vercel-dns.com`)
5. Optional: Hostinger email forward `info@yasellefashion.com` → `amirahatipoglu2001@gmail.com`. Store contact still opens a `mailto:` to the Gmail inbox.
