/** Remote editorial photos only — Unsplash + Pexels. No local bitmaps. */

const u = (photo: string, w = 1400) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;

const p = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  hero: u("photo-1483985988355-763728e1935b", 2000),
  story: u("photo-1469334031218-e382a71b716b", 1600),
  modestEdit: u("photo-1554882195-8cf792f9a571", 1600),
  fabric: u("photo-1620799140408-edc6dcb6d633"),
  abaya: u("photo-1617137968427-85924c800a22"),
  abayaAlt: u("photo-1490481651871-ab68de25d43d"),
  tunic: u("photo-1529139574466-a303027c1d8b"),
  jacket: u("photo-1591047139829-d91aecb6caea"),
  pants: u("photo-1594633312681-425c7b97ccd1"),
  set: u("photo-1487222477894-8943e31ef7b2"),
  sweat: u("photo-1556821840-3a63f95609a7"),
  skirt: u("photo-1583496661160-fb5886a0aaaa"),
  dress: u("photo-1566174053879-31528523f8ae"),
  abiye: u("photo-1595777457583-95e059d581b8"),
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
} as const;
