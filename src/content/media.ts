/** Remote editorial photos only — Unsplash + Pexels. No local bitmaps. */

const u = (photo: string, w = 1400) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;

const p = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  hero: u("photo-1483985988355-763728e1935b", 2000),
  story: u("photo-1469334031218-e382a71b716b", 1600),
  modestEdit: p(35324598, 1600),
  fabric: u("photo-1620799140408-edc6dcb6d633"),
  abaya: u("photo-1767647986631-efdd7b1e6e18"),
  abayaAlt: p(35324599),
  abayaCuff: p(35324600),
  tunic: u("photo-1561442748-c50715dc32f6"),
  jacket: p(34430862),
  pants: p(29188564),
  set: p(29188562),
  setAlt: p(29188563),
  sweat: u("photo-1630735988694-12186aedd73d"),
  skirt: p(35324626),
  dress: u("photo-1566174053879-31528523f8ae"),
  abiye: p(35344026),
  eveningModest: p(8002595),
  eveningRed: u("photo-1539008835657-9e8e9680c956"),
  shirt: u("photo-1596755094514-f87e34085b2c"),
  blouse: u("photo-1521572163474-6864f9cf17ab"),
  bag: u("photo-1584917865442-de89df76afd3"),
  bagAlt: p(1152077),
  scarf: u("photo-1601924994987-69e26d50dc26"),
  shoes: p(336372),
  shoesAlt: p(1375736),
  beach: u("photo-1507525428034-b723cf961d3e"),
  linen: u("photo-1515886657613-9f3515b0c78f"),
  perfume: u("photo-1541643600914-78b084683601"),
  beauty: p(985635),
  beigeCoat: u("photo-1604581312410-72dbb2553d26"),
  lookbook: u("photo-1492707892479-7bc8d5a4ee93"),
  modestSand: p(13791549),
} as const;
