# Yaselle AI

Women’s fashion storefront: editorial home, modest and ready-to-wear edits, listing, product, bag, favorites, and a Yaselle AI advisor that never invents stock or dates.

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

- Products and menus: `src/content/catalog.ts`
- Regions and currencies: `src/content/regions.ts`
- Copy: `src/content/i18n.ts`
