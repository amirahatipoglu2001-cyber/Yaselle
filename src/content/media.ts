/** Remote editorial photos only — Unsplash + Pexels. No local bitmaps. */

const u = (photo: string, w = 1400) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;

const p = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  hero: u("photo-1651828855150-ba40f6870a53", 2000),
  story: u("photo-1640154852340-9de73a0643a8", 1600),
  modestEdit: p(35324598, 1600),
  fabric: u("photo-1620799140408-edc6dcb6d633"),
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
  dress: u("photo-1546246380-70f857cf5310"),
  abiye: p(35344026),
  eveningModest: p(8002595),
  eveningRed: u("photo-1768830985958-e8d3a93d3f14"),
  shirt: u("photo-1594048225077-fe0c6e35d822"),
  blouse: u("photo-1585728748176-455ac5eed962"),
  bag: u("photo-1584917865442-de89df76afd3"),
  bagAlt: p(1152077),
  scarf: u("photo-1626497361649-81cc097e9bfd"),
  shoes: p(336372),
  shoesAlt: p(1375736),
  beach: u("photo-1507525428034-b723cf961d3e"),
  linen: u("photo-1640154853987-48e54d2ca0b8"),
  perfume: u("photo-1541643600914-78b084683601"),
  beauty: p(985635),
  beigeCoat: u("photo-1547720435-4e8910fb1f0b"),
  lookbook: p(34576734),
  modestSand: p(13791549),
  hijabEditorial: u("photo-1552874869-5c39ec9288dc"),
  hijabLace: u("photo-1696318024580-58b55ed21ab6"),
} as const;
