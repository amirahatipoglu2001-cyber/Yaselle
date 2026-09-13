export const profile = {
  name: "Amira Hatipoğlu",
  shortName: "Amira",
  monogram: "AH",
  title: "Product-minded software engineer",
  location: "Türkiye",
  email: "amirahatipoglu2001@gmail.com",
  github: "https://github.com/amirahatipoglu2001-cyber",
  githubHandle: "amirahatipoglu2001-cyber",
  availability: "Open to internships, junior product engineering, and design-engineering collaborations.",
  headline:
    "I design and build interfaces that stay calm when the work is messy.",
  intro:
    "Software engineer working at the seam of product, language, and systems. I care about the moment between a tap and a consequence — the copy, the timing, the empty state, and what happens when something fails.",
  about: [
    "I'm Amira Hatipoğlu. I write software with the patience of someone who has been on the other side of a confusing screen. Most of my attention goes to tools people use under time pressure: students swapping books before an exam, café crews covering a missing shift, a walk along the water with a phone that should stay out of the way.",
    "This site is a working studio. The pieces here are independent product studies — original work I designed end to end so you can see how I think, not a gallery of invented clients. When a study ships as a real product, it will replace the write-up.",
    "I like TypeScript when the types earn their keep, copy that sounds like a person, and layouts that still make sense at 360 pixels. I do not like dashboards that apologize for themselves.",
  ],
  now: [
    {
      label: "Building",
      text: "This studio site, and tightening the Sahaf study into something a campus could actually run.",
    },
    {
      label: "Learning",
      text: "How product decisions survive contact with real constraints — data, edge cases, and the last 10% of polish.",
    },
    {
      label: "Looking for",
      text: "Teams that treat interface and implementation as one job.",
    },
  ],
  approach: [
    {
      title: "Start from the failure",
      text: "I sketch the empty state, the error, and the thing that must not happen before I draw the happy path. If those three are honest, the rest of the product has somewhere to stand.",
    },
    {
      title: "Name things like a person",
      text: "Buttons, emails, and empty rooms should sound like someone in the room, not a policy document. If I cannot read the copy out loud, it is not done.",
    },
    {
      title: "One source of truth",
      text: "Content, metadata, and the index should come from the same files. A portfolio that lies to itself will lie to visitors.",
    },
  ],
  tools: [
    { group: "Build", items: ["TypeScript", "React", "Next.js", "Node"] },
    { group: "Interface", items: ["Figma", "Tailwind", "shadcn/ui"] },
    { group: "Shape", items: ["SQL", "Git", "REST", "product writing"] },
  ],
} as const;

export type Profile = typeof profile;
