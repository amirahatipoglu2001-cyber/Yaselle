# Yaselle AI

Women’s fashion storefront: editorial home, modest and ready-to-wear edits, listing, product, bag, favorites, and a Yaselle AI advisor that never invents stock or dates.

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

## Edit the house

- Owner / contact email: `src/content/profile.ts`
- Products and menus: `src/content/catalog.ts`
- Regions and currencies: `src/content/regions.ts`
- Copy: `src/content/i18n.ts`
- Photographs: remote Unsplash and Pexels URLs in `src/content/media.ts` (no local product photos)
- Wordmark: `public/yaselle-mark.svg`
