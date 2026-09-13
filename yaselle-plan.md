# Yaselle AI — E-Ticaret Deneyim, İçerik ve Görsel Tasarım Dokümanı

This file is the source brief for the storefront. The running app implements a complete first slice: region and language, editorial home, listing, product, bag, favorites, account, search, and Yaselle AI chat.

## 1. Marka ve deneyim fikri

**Yaselle AI**, modern, rafine ve kişisel hissettiren bir kadın moda e-ticaret deneyimidir. Kullanıcı siteye ilk birkaç saniyede şu üç şeyi anlamalıdır:

1. Yaselle seçkin ve güncel bir moda markasıdır.
2. Aradığı ürünü zorlanmadan keşfedebilir, bedenini ve siparişini güvenle yönetebilir.
3. Marka, yapay zekâ destekli ama insani bir alışveriş danışmanı sunar.

Louis Vuitton benzeri güçlü editoryal boşluklar, premium tipografi ve sakin arayüz hissi referans alınabilir; ancak tasarım **kopyalanmamalı**. Yaselle daha erişilebilir, akıcı ve ürün keşfini önceleyen özgün bir dil kurmalıdır.

### Görsel dil

- Arka plan: kırık beyaz / sıcak taş tonu (`#F8F6F2`).
- Ana metin: kömür siyahı (`#171717`).
- Vurgu: espresso kahvesi (`#3C2418`).
- İndirim ve uyarı: sadece gerektiğinde koyu kırmızı.
- Tipografi: başlıklarda zarif serif, gövdede yüksek okunurluklu modern sans-serif.
- Fotoğraf: doğal ışık, tam boy görünüm, kumaş dokusu, temiz arka plan.
- Arayüz: bol nefes alanı, ince ayraçlar, küçük ikonlar, az yuvarlatılmış köşeler.

### Hareket ilkeleri

- 250–400 ms opacity + hafif yukarı kayma.
- Ürün kartında hover’da ikinci fotoğraf; 150–200 ms.
- Sabit en-boy oranlı skeleton; CLS yok.
- Scroll reveal yalnızca ilk görünümde, 8–16 px.
- `prefers-reduced-motion` açıkken animasyonlar durur.

## 2–9

Implemented in the storefront: region gate, header and drawer, editorial home, PLP filters and exact sort list, PDP, favorites collections with share links, mini-bag and bag page, account panel, Yaselle AI chat that never invents stock or dates, plus empty, loading, error, and 404 states.
