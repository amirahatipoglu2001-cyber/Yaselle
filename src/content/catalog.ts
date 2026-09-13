import { media } from "@/content/media";

export type Locale = "en" | "tr";

export type Localized = Record<Locale, string>;

export type ProductColor = {
  id: string;
  name: Localized;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: Localized;
  summary: Localized;
  details: Localized;
  fit: Localized;
  fabric: Localized;
  care: Localized;
  category: string;
  subcategory: string;
  alsoIn?: string[];
  priceTry: number;
  compareAtTry?: number;
  colors: ProductColor[];
  sizes: string[];
  stock: Record<string, number>;
  materials: string[];
  collection: "new" | "essentials" | "evening";
  images: [string, string, ...string[]];
  tags: Array<"new" | "bestseller" | "modest" | "custom" | "sale">;
  soldCount: number;
  createdAt: string;
  related: string[];
  completeTheLook: string[];
};

export const categoryTree = [
  {
    id: "tesettur",
    href: "/shop/tesettur",
    label: { en: "Modest wear", tr: "Tesettür" },
    children: [
      { id: "abaya", label: { en: "Abaya", tr: "Abaya" } },
      { id: "abiye", label: { en: "Evening", tr: "Abiye" } },
      { id: "ceket", label: { en: "Jacket", tr: "Ceket" } },
      { id: "tunik", label: { en: "Tunic", tr: "Tunik" } },
      { id: "sweat", label: { en: "Sweat", tr: "Sweat" } },
      { id: "pantolon", label: { en: "Trousers", tr: "Pantolon" } },
      { id: "etek", label: { en: "Skirt", tr: "Etek" } },
      { id: "alt-ust-takim", label: { en: "Sets", tr: "Alt-Üst Takım" } },
    ],
  },
  {
    id: "giyim",
    href: "/shop/giyim",
    label: { en: "Ready-to-wear", tr: "Giyim" },
    children: [
      { id: "elbise", label: { en: "Dress", tr: "Elbise" } },
      { id: "abiye", label: { en: "Evening", tr: "Abiye" } },
      { id: "etek", label: { en: "Skirt", tr: "Etek" } },
      { id: "gomlek", label: { en: "Shirt", tr: "Gömlek" } },
      { id: "bluz", label: { en: "Blouse", tr: "Bluz" } },
      { id: "ceket", label: { en: "Jacket", tr: "Ceket" } },
      { id: "sweat", label: { en: "Sweat", tr: "Sweat" } },
      { id: "pantolon", label: { en: "Trousers", tr: "Pantolon" } },
      { id: "alt-ust-takim", label: { en: "Sets", tr: "Alt-Üst Takım" } },
    ],
  },
  {
    id: "canta-aksesuar",
    href: "/shop/canta-aksesuar",
    label: { en: "Bags & accessories", tr: "Çanta ve Aksesuar" },
    children: [
      { id: "cantalar", label: { en: "Bags", tr: "Çantalar" } },
      { id: "sapkalar", label: { en: "Hats", tr: "Şapkalar" } },
      { id: "kemerler", label: { en: "Belts", tr: "Kemerler" } },
      { id: "takilar", label: { en: "Jewellery", tr: "Takılar" } },
      { id: "esarplar", label: { en: "Scarves", tr: "Eşarplar/Şallar" } },
    ],
  },
  { id: "ayakkabilar", href: "/shop/ayakkabilar", label: { en: "Shoes", tr: "Ayakkabılar" }, children: [] },
  { id: "plaj", href: "/shop/plaj", label: { en: "Beach", tr: "Plaj Ürünleri" }, children: [] },
  {
    id: "bakim-guzellik",
    href: "/shop/bakim-guzellik",
    label: { en: "Care & beauty", tr: "Bakım ve Güzellik" },
    children: [
      { id: "bakim", label: { en: "Care", tr: "Bakım Ürünleri" } },
      { id: "parfum", label: { en: "Perfume", tr: "Parfümler" } },
      { id: "makyaj", label: { en: "Makeup", tr: "Makyaj Ürünleri" } },
    ],
  },
  { id: "yeni-koleksiyon", href: "/shop/yeni-koleksiyon", label: { en: "New collection", tr: "Yeni Koleksiyon" }, children: [] },
] as const;

export const menuExtras = [
  { href: "/shop/yeni-koleksiyon", label: { en: "New season", tr: "Yeni Sezon" } },
  { href: "/custom-order", label: { en: "Custom order", tr: "Özel Dikim Sipariş" } },
  { href: "/shop?sort=bestseller", label: { en: "Bestsellers", tr: "Bestseller" } },
  { href: "/shop?sort=sale", label: { en: "Campaigns & offers", tr: "Kampanya ve İndirimler" } },
  { href: "/help/size-guide", label: { en: "Size guide", tr: "Beden Tablosu" } },
  { href: "/help/shipping", label: { en: "Shipping & delivery", tr: "Kargo & Teslimat" } },
  { href: "/help/payment", label: { en: "Payment", tr: "Ödeme" } },
  { href: "/help/contact", label: { en: "Contact", tr: "İletişim" } },
  { href: "/help/satisfaction", label: { en: "Client care", tr: "Müşteri Memnuniyeti" } },
] as const;

/** Homepage strip — exactly these three, no Tesettür / Elbiseler. Women only. */
export const quickCategories = [
  {
    id: "bestseller",
    href: "/shop?sort=bestseller",
    image: media.dress,
    label: { en: "Bestseller", tr: "Bestseller" },
  },
  {
    id: "new-season",
    href: "/shop?sort=newest",
    image: media.eveningOpen,
    label: { en: "New season", tr: "Yeni sezon" },
  },
  {
    id: "sale",
    href: "/shop?sort=sale",
    image: media.blouse,
    label: { en: "Discounted products", tr: "İndirimli ürünler" },
  },
] as const;

const sizes = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    id: "abaya-midnight",
    slug: "midnight-column-abaya",
    name: { en: "Midnight Column Abaya", tr: "Midnight Sütun Abaya" },
    summary: { en: "A long, quiet line in espresso wool-silk.", tr: "Espresso yün-ipek karışımında uzun, sakin bir çizgi." },
    details: { en: "Cut to skim rather than cling. Concealed placket, modest neckline, and a hem that clears the floor by a measured inch.", tr: "Saran değil, akan bir kalıp. Gizli pat, ölçülü yaka ve zeminden kontrollü bir etek ucu." },
    fit: { en: "Relaxed column. Model wears M. Length 147 cm.", tr: "Rahat sütun kalıp. Manken M beden giyiyor. Boy 147 cm." },
    fabric: { en: "62% wool, 38% silk. Lined in viscose.", tr: "62% yün, 38% ipek. Viskon astar." },
    care: { en: "Dry clean. Steam, do not iron the silk face.", tr: "Kuru temizleme. İpek yüzeye ütü değdirmeyin, buhar kullanın." },
    category: "tesettur",
    subcategory: "abaya",
    priceTry: 18990,
    colors: [
      { id: "espresso", name: { en: "Espresso", tr: "Espresso" }, hex: "#3C2418" },
      { id: "ink", name: { en: "Ink", tr: "Mürekkep" }, hex: "#171717" },
    ],
    sizes,
    stock: { XS: 4, S: 6, M: 2, L: 5, XL: 3 },
    materials: ["wool", "silk"],
    collection: "new",
    images: [media.abaya, media.abayaAlt, media.abayaCuff],
    tags: ["new", "bestseller", "modest", "custom"],
    soldCount: 186,
    createdAt: "2026-08-12",
    related: ["tunic-sand", "jacket-atelier"],
    completeTheLook: ["bag-espresso", "scarf-dune"],
  },
  {
    id: "tunic-sand",
    slug: "sand-drape-tunic",
    name: { en: "Sand Drape Tunic", tr: "Kum Düşümlü Tunik" },
    summary: { en: "A tunic with weight enough to stay composed in wind.", tr: "Rüzgârda bile duruşunu koruyan ağırlıkta bir tunik." },
    details: { en: "Dropped shoulder, side slits, and a neckline that sits closed without a pin.", tr: "Düşük omuz, yan yırtmaçlar ve iğnesiz duran kapalı yaka." },
    fit: { en: "Easy over trousers. Hip 108 cm in M.", tr: "Pantolon üzerine rahat. M bedende kalça 108 cm." },
    fabric: { en: "Washed cupro-cotton.", tr: "Yıkanmış kupro-pamuk." },
    care: { en: "Gentle wash 30°C. Hang dry.", tr: "30°C hassas yıkama. Askıda kurutun." },
    category: "tesettur",
    subcategory: "tunik",
    alsoIn: ["yeni-koleksiyon"],
    priceTry: 6490,
    colors: [
      { id: "sand", name: { en: "Sand", tr: "Kum" }, hex: "#C4B49A" },
      { id: "stone", name: { en: "Stone", tr: "Taş" }, hex: "#D9D1C4" },
    ],
    sizes,
    stock: { XS: 8, S: 10, M: 9, L: 7, XL: 4 },
    materials: ["cotton", "cupro"],
    collection: "new",
    images: [media.tunic, media.modestSand, media.set],
    tags: ["new", "modest"],
    soldCount: 94,
    createdAt: "2026-08-28",
    related: ["set-horizon", "pants-column"],
    completeTheLook: ["pants-column", "scarf-dune"],
  },
  {
    id: "jacket-atelier",
    slug: "atelier-jacket",
    name: { en: "Atelier Jacket", tr: "Atelier Ceket" },
    summary: { en: "A modest jacket with a private-atelier shoulder.", tr: "Atölye omuzu olan ölçülü bir ceket." },
    details: { en: "Single breast, covered buttons, and a back vent that keeps the hem honest when you walk.", tr: "Tek sıra, kapalı düğmeler ve yürürken eteği düzgün tutan arka yırtmaç." },
    fit: { en: "Tailored through the shoulder, ease at the hip. Custom fit available.", tr: "Omuzda oturur, kalçada rahat. Özel dikim mümkün." },
    fabric: { en: "Camel wool mill-cloth.", tr: "Deve tüyü yün kumaş." },
    care: { en: "Dry clean only.", tr: "Yalnızca kuru temizleme." },
    category: "tesettur",
    subcategory: "ceket",
    alsoIn: ["giyim"],
    priceTry: 12990,
    colors: [{ id: "camel", name: { en: "Camel", tr: "Camel" }, hex: "#C4A574" }],
    sizes,
    stock: { XS: 3, S: 4, M: 5, L: 3, XL: 2 },
    materials: ["wool"],
    collection: "essentials",
    images: [media.jacket, media.lookbook, media.abayaAlt],
    tags: ["modest", "custom", "bestseller"],
    soldCount: 141,
    createdAt: "2026-07-02",
    related: ["abaya-midnight", "shirt-poplin"],
    completeTheLook: ["pants-column", "bag-espresso"],
  },
  {
    id: "pants-column",
    slug: "soft-column-trousers",
    name: { en: "Soft Column Trousers", tr: "Yumuşak Sütun Pantolon" },
    summary: { en: "Wide, pressed, and long enough to cover the shoe.", tr: "Geniş, ütülü ve ayakkabıyı örtecek kadar uzun." },
    details: { en: "High rise with a hidden elastic at the back. Front crease holds after sitting.", tr: "Yüksek bel, arkada gizli lastik. Oturunca ütü izi dağılmaz." },
    fit: { en: "Full length. Inseam 86 cm in M.", tr: "Tam boy. M bedende iç bacak 86 cm." },
    fabric: { en: "Stretch wool-blend crepe.", tr: "Esnek yün karışımı krep." },
    care: { en: "Dry clean or cool steam.", tr: "Kuru temizleme veya soğuk buhar." },
    category: "tesettur",
    subcategory: "pantolon",
    alsoIn: ["giyim"],
    priceTry: 5290,
    colors: [
      { id: "charcoal", name: { en: "Charcoal", tr: "Antrasit" }, hex: "#3A3A3A" },
      { id: "sand", name: { en: "Sand", tr: "Kum" }, hex: "#C4B49A" },
    ],
    sizes,
    stock: { XS: 5, S: 8, M: 1, L: 6, XL: 4 },
    materials: ["wool"],
    collection: "essentials",
    images: [media.pants, media.setAlt, media.tunic],
    tags: ["modest"],
    soldCount: 122,
    createdAt: "2026-06-18",
    related: ["tunic-sand", "set-horizon"],
    completeTheLook: ["tunic-sand", "shoes-sling"],
  },
  {
    id: "set-horizon",
    slug: "horizon-set",
    name: { en: "Horizon Two-Piece", tr: "Horizon Alt-Üst Takım" },
    summary: { en: "Tunic and trouser cut from the same sand mill-run.", tr: "Aynı kum rengi kumaştan tunik ve pantolon." },
    details: { en: "Sold as a set. Side-seam pockets, covered zip, and a tunic long enough for travel days.", tr: "Takım olarak satılır. Yan cep, gizli fermuar ve seyahat günlerine yetecek tunik boyu." },
    fit: { en: "Matched set. Order your usual tunic size.", tr: "Eşleşmiş takım. Tunik bedeninizi alın." },
    fabric: { en: "Matte cupro blend.", tr: "Mat kupro karışımı." },
    care: { en: "Gentle wash. Iron on reverse.", tr: "Hassas yıkama. Tersinden ütüleyin." },
    category: "tesettur",
    subcategory: "alt-ust-takim",
    alsoIn: ["giyim", "yeni-koleksiyon"],
    priceTry: 9890,
    colors: [{ id: "sand", name: { en: "Sand", tr: "Kum" }, hex: "#C4B49A" }],
    sizes,
    stock: { XS: 4, S: 6, M: 6, L: 4, XL: 2 },
    materials: ["cupro"],
    collection: "new",
    images: [media.set, media.pants, media.setAlt],
    tags: ["new", "modest", "custom"],
    soldCount: 77,
    createdAt: "2026-09-01",
    related: ["tunic-sand", "abaya-midnight"],
    completeTheLook: ["bag-espresso", "scarf-dune"],
  },
  {
    id: "sweat-modest",
    slug: "quiet-sweat-tunic",
    name: { en: "Quiet Sweat Tunic", tr: "Sakin Sweat Tunik" },
    summary: { en: "A sweat in the language of a tunic, not a gym.", tr: "Spor salonu değil, tunik dilinde bir sweat." },
    details: { en: "Brushed inside, clean hem, no logos. Long enough over trousers.", tr: "İçi fırçalı, düz etek ucu, logosuz. Pantolon üzerine yeterince uzun." },
    fit: { en: "Relaxed. Hip coverage is generous.", tr: "Rahat kalıp. Kalça örtümü geniştir." },
    fabric: { en: "Organic cotton fleece.", tr: "Organik pamuk polar." },
    care: { en: "Wash 30°C. Do not tumble.", tr: "30°C yıkayın. Kurutma makinesi kullanmayın." },
    category: "tesettur",
    subcategory: "sweat",
    alsoIn: ["giyim"],
    priceTry: 3490,
    compareAtTry: 4290,
    colors: [{ id: "taupe", name: { en: "Taupe", tr: "Toprak" }, hex: "#A89888" }],
    sizes,
    stock: { XS: 12, S: 14, M: 11, L: 9, XL: 7 },
    materials: ["cotton"],
    collection: "essentials",
    images: [media.sweat, media.tunic, media.modestSand],
    tags: ["modest", "sale"],
    soldCount: 203,
    createdAt: "2026-05-09",
    related: ["pants-column", "skirt-pleat"],
    completeTheLook: ["pants-column", "shoes-sling"],
  },
  {
    id: "skirt-modest",
    slug: "floor-skirt",
    name: { en: "Floor Skirt", tr: "Yere Uzanan Etek" },
    summary: { en: "A modest skirt that still moves.", tr: "Hareket eden ölçülü bir etek." },
    details: { en: "Invisible side zip, lined, and a kick-pleat so walking stays easy.", tr: "Gizli yan fermuar, astar ve yürüyüşü kolaylaştıran pile." },
    fit: { en: "High waist. Length 108 cm.", tr: "Yüksek bel. Boy 108 cm." },
    fabric: { en: "Wool crepe.", tr: "Yün krep." },
    care: { en: "Dry clean.", tr: "Kuru temizleme." },
    category: "tesettur",
    subcategory: "etek",
    alsoIn: ["giyim"],
    priceTry: 4790,
    colors: [{ id: "taupe", name: { en: "Taupe", tr: "Toprak" }, hex: "#B7A48C" }],
    sizes,
    stock: { XS: 3, S: 5, M: 4, L: 3, XL: 0 },
    materials: ["wool"],
    collection: "essentials",
    images: [media.skirt, media.abayaCuff, media.pants],
    tags: ["modest"],
    soldCount: 58,
    createdAt: "2026-04-21",
    related: ["tunic-sand", "shirt-poplin"],
    completeTheLook: ["shirt-poplin", "shoes-sling"],
  },
  {
    id: "dress-ivory",
    slug: "ivory-column-dress",
    name: { en: "Ivory Column Dress", tr: "Fildişi Sütun Elbise" },
    summary: { en: "Silk that holds a straight line from shoulder to hem.", tr: "Omuzdan eteğe düz duran ipek." },
    details: { en: "Bias lining, covered back zip, and sleeves that finish at the wrist.", tr: "Bias astar, gizli sırt fermuarı ve bilekte biten kollar." },
    fit: { en: "Column. Custom length available.", tr: "Sütun kalıp. Özel boy mümkün." },
    fabric: { en: "Silk satin, viscose lining.", tr: "İpek saten, viskon astar." },
    care: { en: "Dry clean only.", tr: "Yalnızca kuru temizleme." },
    category: "giyim",
    subcategory: "elbise",
    alsoIn: ["yeni-koleksiyon"],
    priceTry: 15990,
    colors: [{ id: "ivory", name: { en: "Ivory", tr: "Fildişi" }, hex: "#F3EBDD" }],
    sizes,
    stock: { XS: 2, S: 3, M: 4, L: 2, XL: 1 },
    materials: ["silk"],
    collection: "new",
    images: [media.dress, media.dressAlt, media.eveningOpen],
    tags: ["new", "custom"],
    soldCount: 61,
    createdAt: "2026-09-04",
    related: ["abiye-bordeaux", "jacket-atelier"],
    completeTheLook: ["bag-espresso", "shoes-sling"],
  },
  {
    id: "abiye-bordeaux",
    slug: "bordeaux-abiye",
    name: { en: "Bordeaux Evening Dress", tr: "Bordo Abiye" },
    summary: { en: "Evening without noise. A dark bordeaux column.", tr: "Gürültüsüz bir gece. Koyu bordo sütun." },
    details: { en: "Long sleeve, closed neck, and a train you can hook for stairs.", tr: "Uzun kol, kapalı yaka ve merdiven için toplanabilen kuyruk." },
    fit: { en: "Fitted through the rib, ease at the hem. Custom fit available.", tr: "Göğüste oturur, etekte rahat. Özel dikim mümkün." },
    fabric: { en: "Silk crepe.", tr: "İpek krep." },
    care: { en: "Dry clean. Store hanging.", tr: "Kuru temizleme. Askıda saklayın." },
    category: "giyim",
    subcategory: "abiye",
    alsoIn: ["tesettur"],
    priceTry: 21990,
    colors: [{ id: "bordeaux", name: { en: "Bordeaux", tr: "Bordo" }, hex: "#5C1F24" }],
    sizes,
    stock: { XS: 1, S: 2, M: 2, L: 1, XL: 1 },
    materials: ["silk"],
    collection: "evening",
    images: [media.abiye, media.eveningModest, media.skirt],
    tags: ["bestseller", "modest", "custom"],
    soldCount: 88,
    createdAt: "2026-03-14",
    related: ["dress-ivory", "abaya-midnight"],
    completeTheLook: ["bag-espresso", "scarf-dune"],
  },
  {
    id: "shirt-poplin",
    slug: "ivory-poplin-shirt",
    name: { en: "Ivory Poplin Shirt", tr: "Fildişi Poplin Gömlek" },
    summary: { en: "A shirt cut like a quiet argument.", tr: "Sakin bir tartışma gibi kesilmiş gömlek." },
    details: { en: "Mother-of-pearl buttons, a collar that sits without starch, and a hem that tucks or falls.", tr: "Sedef düğmeler, kolasız duran yaka, içeri veya dışarı bırakılabilen etek ucu." },
    fit: { en: "Slightly oversized. Shoulder 41 cm in M.", tr: "Hafif oversize. M bedende omuz 41 cm." },
    fabric: { en: "Egyptian cotton poplin.", tr: "Mısır pamuğu poplin." },
    care: { en: "Wash 40°C. Iron damp.", tr: "40°C yıkayın. Nemliyken ütüleyin." },
    category: "giyim",
    subcategory: "gomlek",
    priceTry: 3890,
    compareAtTry: 4590,
    colors: [{ id: "ivory", name: { en: "Ivory", tr: "Fildişi" }, hex: "#F4EEE4" }],
    sizes,
    stock: { XS: 9, S: 12, M: 10, L: 8, XL: 6 },
    materials: ["cotton"],
    collection: "essentials",
    images: [media.shirt, media.blouse, media.shirtAlt],
    tags: ["sale", "bestseller"],
    soldCount: 170,
    createdAt: "2026-02-11",
    related: ["blouse-cream", "jacket-atelier"],
    completeTheLook: ["pants-column", "skirt-pleat"],
  },
  {
    id: "blouse-cream",
    slug: "cream-silk-blouse",
    name: { en: "Cream Silk Blouse", tr: "Krem İpek Bluz" },
    summary: { en: "A blouse with a private sheen.", tr: "İçeriden parlayan bir bluz." },
    details: { en: "Covered placket and cuffs that button close at the wrist.", tr: "Gizli pat ve bilekte kapanan manşetler." },
    fit: { en: "True to size.", tr: "Bedenine sadık." },
    fabric: { en: "Sand-washed silk.", tr: "Kum yıkanmış ipek." },
    care: { en: "Dry clean or hand wash cold.", tr: "Kuru temizleme veya soğuk elde yıkama." },
    category: "giyim",
    subcategory: "bluz",
    alsoIn: ["yeni-koleksiyon"],
    priceTry: 5690,
    compareAtTry: 6490,
    colors: [{ id: "cream", name: { en: "Cream", tr: "Krem" }, hex: "#EDE4D4" }],
    sizes,
    stock: { XS: 4, S: 6, M: 5, L: 4, XL: 2 },
    materials: ["silk"],
    collection: "new",
    images: [media.blouse, media.shirt, media.linen],
    tags: ["new", "sale"],
    soldCount: 73,
    createdAt: "2026-09-06",
    related: ["shirt-poplin", "skirt-pleat"],
    completeTheLook: ["skirt-pleat", "bag-espresso"],
  },
  {
    id: "skirt-pleat",
    slug: "pleated-midi-skirt",
    name: { en: "Pleated Midi Skirt", tr: "Pileli Midi Etek" },
    summary: { en: "Knife pleats that stay when you sit.", tr: "Oturunca dağılmayan pileler." },
    details: { en: "Satin-faced waistband and a midi length that works with a tunic or a shirt.", tr: "Saten bel bandı; tunik veya gömlekle çalışan midi boy." },
    fit: { en: "Elastic back. Midi, 78 cm.", tr: "Arkası lastikli. Midi, 78 cm." },
    fabric: { en: "Acetate pleat.", tr: "Asetat pile." },
    care: { en: "Hang after wearing. Steam only.", tr: "Giydikten sonra askıya alın. Yalnızca buhar." },
    category: "giyim",
    subcategory: "etek",
    priceTry: 4490,
    colors: [{ id: "taupe", name: { en: "Taupe", tr: "Toprak" }, hex: "#B7A48C" }],
    sizes,
    stock: { XS: 6, S: 7, M: 6, L: 5, XL: 3 },
    materials: ["acetate"],
    collection: "essentials",
    images: [media.lookbookOpen, media.dress, media.shirt],
    tags: ["bestseller"],
    soldCount: 99,
    createdAt: "2026-03-02",
    related: ["shirt-poplin", "blouse-cream"],
    completeTheLook: ["blouse-cream", "shoes-sling"],
  },
  {
    id: "bag-espresso",
    slug: "espresso-shoulder-bag",
    name: { en: "Espresso Shoulder Bag", tr: "Espresso Omuz Çantası" },
    summary: { en: "A compact bag that still holds a day.", tr: "Günü taşıyan kompakt bir çanta." },
    details: { en: "Magnetic flap, suede lining, and a strap that sits on the shoulder without slipping.", tr: "Mıknatıslı kapak, süet astar ve kaymayan omuz askısı." },
    fit: { en: "One size. 24 × 16 × 8 cm.", tr: "Tek beden. 24 × 16 × 8 cm." },
    fabric: { en: "Vegetable-tanned leather.", tr: "Bitkisel tabaklanmış deri." },
    care: { en: "Keep dry. Condition twice a year.", tr: "Kuru tutun. Yılda iki kez bakım yapın." },
    category: "canta-aksesuar",
    subcategory: "cantalar",
    priceTry: 8990,
    colors: [{ id: "espresso", name: { en: "Espresso", tr: "Espresso" }, hex: "#3C2418" }],
    sizes: ["OS"],
    stock: { OS: 14 },
    materials: ["leather"],
    collection: "essentials",
    images: [media.bag, media.bagAlt, media.shoes],
    tags: ["bestseller"],
    soldCount: 240,
    createdAt: "2026-04-04",
    related: ["scarf-dune", "shoes-sling"],
    completeTheLook: ["shoes-sling", "scarf-dune"],
  },
  {
    id: "scarf-dune",
    slug: "dune-silk-scarf",
    name: { en: "Dune Silk Scarf", tr: "Dune İpek Eşarp" },
    summary: { en: "Sand and espresso in a quiet stripe.", tr: "Kum ve espresso, sakin bir çizgide." },
    details: { en: "Hand-rolled edge. Large enough for hair or shoulder.", tr: "El kıvrımı kenar. Saç veya omuz için yeterince büyük." },
    fit: { en: "90 × 90 cm.", tr: "90 × 90 cm." },
    fabric: { en: "Silk twill.", tr: "İpek twill." },
    care: { en: "Dry clean.", tr: "Kuru temizleme." },
    category: "canta-aksesuar",
    subcategory: "esarplar",
    priceTry: 2890,
    colors: [{ id: "dune", name: { en: "Dune", tr: "Kumulu" }, hex: "#C4B49A" }],
    sizes: ["OS"],
    stock: { OS: 22 },
    materials: ["silk"],
    collection: "essentials",
    images: [media.scarf, media.blouse, media.abayaAlt],
    tags: [],
    soldCount: 156,
    createdAt: "2026-05-22",
    related: ["bag-espresso", "abaya-midnight"],
    completeTheLook: ["abaya-midnight", "bag-espresso"],
  },
  {
    id: "shoes-sling",
    slug: "stone-slingback",
    name: { en: "Stone Slingback", tr: "Taş Slingback" },
    summary: { en: "A heel you can walk in after lunch.", tr: "Öğle yemeğinden sonra da yürünebilen bir topuk." },
    details: { en: "45 mm heel, padded insole, and a sling that stays put.", tr: "45 mm topuk, yastıklı taban ve yerinde duran bant." },
    fit: { en: "Runs true. Leather stretches half a size with wear.", tr: "Kalıbına sadık. Deri kullanımda yarım beden açılır." },
    fabric: { en: "Nappa leather, leather sole.", tr: "Nappa deri, deri taban." },
    care: { en: "Protect from rain. Tree the pair overnight.", tr: "Yağmurdan koruyun. Gece kalıp koyun." },
    category: "ayakkabilar",
    subcategory: "ayakkabilar",
    priceTry: 7490,
    colors: [{ id: "stone", name: { en: "Stone", tr: "Taş" }, hex: "#D7C7B3" }],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: { "36": 4, "37": 6, "38": 5, "39": 2, "40": 3, "41": 2 },
    materials: ["leather"],
    collection: "essentials",
    images: [media.shoes, media.shoesAlt, media.bag],
    tags: ["bestseller"],
    soldCount: 131,
    createdAt: "2026-06-01",
    related: ["bag-espresso", "dress-ivory"],
    completeTheLook: ["bag-espresso", "skirt-pleat"],
  },
  {
    id: "beach-shore",
    slug: "shore-coverup",
    name: { en: "Shore Cover-up", tr: "Kıyı Pareo Tunik" },
    summary: { en: "Linen for a late swim and the walk back.", tr: "Geç bir yüzme ve dönüş yürüyüşü için keten." },
    details: { en: "Open weave, full coverage, and a belt you can ignore.", tr: "Açık dokuma, tam örtüm ve istenirse unused bırakılan kuşak." },
    fit: { en: "One-and-a-half sizes of ease. Order your tunic size.", tr: "Bol kesim. Tunik bedeninizi alın." },
    fabric: { en: "European linen.", tr: "Avrupa keteni." },
    care: { en: "Wash cold. Linen likes creases.", tr: "Soğuk yıkayın. Keten kırışmayı sever." },
    category: "plaj",
    subcategory: "plaj",
    alsoIn: ["yeni-koleksiyon"],
    priceTry: 4190,
    colors: [{ id: "cream", name: { en: "Cream", tr: "Krem" }, hex: "#EFE6D8" }],
    sizes,
    stock: { XS: 5, S: 6, M: 6, L: 5, XL: 3 },
    materials: ["linen"],
    collection: "new",
    images: [media.linen, media.coatOpen, media.beach],
    tags: ["new"],
    soldCount: 44,
    createdAt: "2026-08-20",
    related: ["tunic-sand", "scarf-dune"],
    completeTheLook: ["scarf-dune", "bag-espresso"],
  },
  {
    id: "parfum-signature",
    slug: "signature-parfum",
    name: { en: "Yaselle Signature", tr: "Yaselle Signature" },
    summary: { en: "Cedar, fig leaf, and a warm stone after rain.", tr: "Sedir, incir yaprağı ve yağmur sonrası ılık taş." },
    details: { en: "Eau de parfum, 50 ml. Made in small batches in Grasse.", tr: "Eau de parfum, 50 ml. Grasse’ta küçük partiler halinde." },
    fit: { en: "50 ml.", tr: "50 ml." },
    fabric: { en: "Alcohol denat., fragrance, fig leaf, cedarwood.", tr: "Alkol, koku kompozisyonu, incir yaprağı, sedir." },
    care: { en: "Keep away from light.", tr: "Işıktan uzak tutun." },
    category: "bakim-guzellik",
    subcategory: "parfum",
    priceTry: 3290,
    colors: [{ id: "amber", name: { en: "Amber glass", tr: "Kehribar cam" }, hex: "#8A5A32" }],
    sizes: ["50ml"],
    stock: { "50ml": 30 },
    materials: ["fragrance"],
    collection: "essentials",
    images: [media.perfume, media.beauty, media.scarf],
    tags: ["bestseller"],
    soldCount: 312,
    createdAt: "2026-01-08",
    related: ["scarf-dune", "bag-espresso"],
    completeTheLook: [],
  },
];

export function isNewCollection(product: Product) {
  return (
    product.tags.includes("new") ||
    product.collection === "new" ||
    Boolean(product.alsoIn?.includes("yeni-koleksiyon"))
  );
}

export function isBestsellerOrSale(product: Product) {
  return (
    product.tags.includes("bestseller") ||
    product.tags.includes("sale") ||
    Boolean(product.compareAtTry)
  );
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

/** JSON-clone so RSC never ships `undefined` holes to the client. */
export function toClientProduct(product: Product): Product {
  return JSON.parse(JSON.stringify(product)) as Product;
}

export function categoryLabel(id: string, locale: Locale) {
  for (const category of categoryTree) {
    if (category.id === id) return category.label[locale];
    const child = category.children.find((item) => item.id === id);
    if (child) return child.label[locale];
  }
  return id;
}

export function productInCategory(product: Product, category?: string, sub?: string) {
  if (!category) return true;
  const inCategory =
    product.category === category ||
    product.alsoIn?.includes(category) ||
    (category === "yeni-koleksiyon" && product.tags.includes("new"));
  if (!inCategory) return false;
  if (!sub) return true;
  return product.subcategory === sub;
}

export function isInStock(product: Product) {
  return Object.values(product.stock).some((count) => count > 0);
}

export function stockFor(product: Product, size: string) {
  return product.stock[size] ?? 0;
}

export const sortOptions = [
  { id: "in-stock", label: { en: "In stock", tr: "Stoktakiler" } },
  { id: "newest", label: { en: "Newest", tr: "En yeniler" } },
  { id: "bestseller", label: { en: "Bestsellers", tr: "En çok satanlar" } },
  { id: "price-desc", label: { en: "Price: high to low", tr: "Pahalıdan ucuza" } },
  { id: "price-asc", label: { en: "Price: low to high", tr: "Ucuzdan pahalıya" } },
  { id: "sale", label: { en: "On sale", tr: "İndirimdekiler" } },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];
