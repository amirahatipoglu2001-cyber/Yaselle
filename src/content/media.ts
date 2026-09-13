/** Remote editorial photos only — Unsplash + Pexels. No local bitmaps.
 *  Shopper-facing people: women only.
 *  Modest / tesettür keys = tesettürlü (hijab/şal). Open / RTW keys = açık giyinen. */

const u = (photo: string, w = 1400) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;

const p = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  // Open ready-to-wear — uncovered, contemporary, not lingerie
  hero: u("photo-1483985988355-763728e1935b", 2000),
  story: u("photo-1485968579580-b6d095142e6e", 1600),
  dress: p(1055691),
  dressAlt: u("photo-1572804013309-59a88b7e92f1"),
  eveningOpen: u("photo-1595777457583-95e059d581b8"),
  shirt: p(1926769),
  shirtAlt: p(1852382),
  blouse: p(5480696),
  linen: p(5886041),
  coatOpen: u("photo-1539109136881-3be0616acf4b"),
  setOpen: u("photo-1545291730-faff8ca1d4b0"),
  lookbookOpen: p(3310694),
  shopping: p(972995),

  // Modest / tesettür — hijabi women only
  modestEdit: p(35324598, 1600),
  abaya: p(35263627),
  abayaAlt: p(35324599),
  abayaCuff: p(35324600),
  tunic: u("photo-1561442748-c50715dc32f6"),
  jacket: u("photo-1574297500578-afae55026ff3"),
  pants: p(29188564),
  set: u("photo-1643770515578-66328182d332"),
  setAlt: p(29188563),
  sweat: u("photo-1630735988694-12186aedd73d"),
  skirt: p(35324626),
  abiye: p(35344026),
  eveningModest: p(8002595),
  eveningRed: u("photo-1768830985958-e8d3a93d3f14"),
  scarf: u("photo-1626497361649-81cc097e9bfd"),
  lookbook: p(34576734),
  modestSand: p(13791549),
  hijabEditorial: u("photo-1552874869-5c39ec9288dc"),
  hijabLace: u("photo-1696318024580-58b55ed21ab6"),

  // Still life — no people
  fabric: u("photo-1620799140408-edc6dcb6d633"),
  bag: u("photo-1584917865442-de89df76afd3"),
  bagAlt: p(1152077),
  shoes: p(336372),
  shoesAlt: p(1375736),
  beach: u("photo-1507525428034-b723cf961d3e"),
  perfume: u("photo-1541643600914-78b084683601"),
  beauty: p(985635),
} as const;
