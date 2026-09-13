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

## Hostinger domain — yasellefashion.com bağlamak

Bu uygulama **Next.js**. Hostinger’da `yasellefashion.com` satın almak, vitrinin o adreste otomatik açıldığı anlamına gelmez. Domain kaydı ≠ Next.js hosting.

### Önerilen yol: Vercel (veya benzeri) + Hostinger DNS

1. Repoyu [Vercel](https://vercel.com) (veya benzer bir Next.js host) hesabına bağlayıp deploy edin.
2. Vercel → Project → **Settings → Domains** → `yasellefashion.com` ve `www.yasellefashion.com` ekleyin. Vercel size DNS kayıtlarını gösterir — **ekrandaki değerleri kullanın**.
3. Hostinger hPanel → **Domains** → **yasellefashion.com** → **DNS / DNS Zone Editor**:
   - **A** kaydı: host `@` (kök) → Vercel’in verdiği IPv4 (çoğu projede `10.0.1.2`)
   - **CNAME** kaydı: host `www` → Vercel’in verdiği hedef (çoğu projede `cname.vercel-dns.com`)
4. Hostinger’ın park / varsayılan A ve CNAME kayıtlarını silin veya güncelleyin; aynı host için iki çelişen kayıt bırakmayın.
5. Vercel’de domain **Valid** olunca HTTPS otomatik gelir. `https://yasellefashion.com` ve `https://www.yasellefashion.com` açılmalı.

DNS yayılması Hostinger ve tarayıcı önbelleğine bağlıdır. Kayıtlar Vercel ekranıyla birebir örtüşmeli.

### Alternatif: Hostinger VPS / Node

Next.js’i Hostinger **VPS** üzerinde Node + reverse proxy ile de çalıştırabilirsiniz. Bu stack için Vercel daha pratik. Paylaşımlı Hostinger site builder / PHP hosting Next.js çalıştırmaz. Hostinger’da kalmakta ısrar edilirse VPS yolunu kullanın; varsayılan tercih Vercel’dir.

### E-posta

Sitedeki iletişim `mailto:` ile **amirahatipoglu2001@gmail.com** adresine gider. Gmail kutusunu değiştirmeyin.

İsterseniz Hostinger’da isteğe bağlı e-posta yönlendirmesi kurabilirsiniz: `info@yasellefashion.com` → `amirahatipoglu2001@gmail.com`. Uygulama o adrese mail göndermez; bu yalnızca Hostinger panelindeki forwarding’dir.

## Edit the house

- Canonical domain / URL: `src/content/site.ts`
- Owner / contact email: `src/content/profile.ts`
- Products and menus: `src/content/catalog.ts`
- Regions and currencies: `src/content/regions.ts`
- Copy: `src/content/i18n.ts`
- Photographs: remote Unsplash and Pexels URLs in `src/content/media.ts` (no local product photos)
- Wordmark: `public/yaselle-mark.svg`
