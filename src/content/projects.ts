export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  kind: string;
  stack: string[];
  summary: string;
  lede: string;
  cover: {
    motif: "books" | "shifts" | "coast";
    caption: string;
  };
  sections: ProjectSection[];
  decisions: { title: string; text: string }[];
  next: string;
};

export const projects: Project[] = [
  {
    slug: "sahaf",
    title: "Sahaf",
    year: "2026",
    role: "Product, design, engineering",
    kind: "Independent study",
    stack: ["Next.js", "TypeScript", "Postgres"],
    summary:
      "A campus secondhand book exchange that treats listings like a desk, not a marketplace shout.",
    lede: "Every September the same stack of first-year textbooks changes hands in group chats, campus stairs, and hastily printed posters. Sahaf is a quieter place to leave a book for the next student who needs it.",
    cover: {
      motif: "books",
      caption: "Stacked course texts, annotated in rust.",
    },
    sections: [
      {
        heading: "The problem",
        body: "University cities already have a used-book economy. It just lives in the wrong rooms: WhatsApp groups that expire, Instagram stories that vanish, and Facebook listings written like classified ads from 2009. Students do not want a storefront. They want to know whether the 2024 edition of a specific title is sitting on a desk two tram stops away, and whether the seller can meet at the library tomorrow.",
      },
      {
        heading: "Who it is for",
        body: "Undergraduates who buy the same ten titles every year, and the ones who are done with them. A listing should take under two minutes. A search should feel like scanning a shelf: title, edition, price, campus, and a face you might already pass in the corridor.",
      },
      {
        heading: "Constraints",
        body: "No payments in the first version — money still changes hands in person, which keeps trust local and the product honest. No public profiles beyond a first name and faculty. No infinite scroll of junk: a listing expires when the semester does.",
      },
    ],
    decisions: [
      {
        title: "Search is a shelf, not a feed",
        text: "The default view is the current semester’s required reading for your faculty, with availability marked in the margin. Discovery is a side door, not the front of the house.",
      },
      {
        title: "Edition is a first-class field",
        text: "The wrong year of a textbook is a wasted trip. Sahaf refuses to publish a listing without edition, and it warns you when a nearby copy is the one your syllabus actually names.",
      },
      {
        title: "Meetup over messaging theatre",
        text: "Chat exists to pick a place and a twenty-minute window. There is no typing indicator, no read receipts, no stickers. After a meetup is confirmed, the thread closes itself.",
      },
    ],
    next: "A faculty-admin mode so departments can paste a reading list once, and a simple hold system so two people do not walk across campus for the same copy.",
  },
  {
    slug: "vardiya",
    title: "Vardiya",
    year: "2026",
    role: "Product, design, engineering",
    kind: "Independent study",
    stack: ["React", "TypeScript", "SQLite"],
    summary:
      "Shift coverage for café and floor teams that does not live in a 240-person group chat.",
    lede: "When someone calls in sick at 07:40, the answer should not be a screenshot of a spreadsheet followed by twelve voice notes. Vardiya is a small board for covering a shift and going back to work.",
    cover: {
      motif: "shifts",
      caption: "A week of blocks, one of them open.",
    },
    sections: [
      {
        heading: "The problem",
        body: "Hospitality teams already know who can cover whom. The tools they are given — WhatsApp, a shared Excel file, a manager’s memory — collapse the moment two people are sick on the same Saturday. The people with the most context are on the floor, not in an office, and they need to see a hole in the week in under five seconds.",
      },
      {
        heading: "Who it is for",
        body: "Shifts of eight to forty people: cafés, small hotels, campus kitchens. A manager publishes the week. Anyone on the roster can offer or claim a slot. The product has to work with wet hands, a cracked Android, and a break that lasts eleven minutes.",
      },
      {
        heading: "Constraints",
        body: "Offline-first for the current week. No HR suite. No performance reviews hiding in the navigation. Notifications are a single sentence: who, when, which station. If a claim conflicts, the first confirmed claim wins and everyone else sees it immediately.",
      },
    ],
    decisions: [
      {
        title: "The week is the only screen",
        text: "There is no home dashboard. You open Vardiya and you are looking at Monday through Sunday, your name already highlighted. Open shifts pulse once, then sit still so they do not feel like an alarm.",
      },
      {
        title: "Claim is a verb with a receipt",
        text: "Tapping an open block asks one question: can you actually work this? Confirming writes your name into the grid and texts the manager a line they can screenshot into payroll later.",
      },
      {
        title: "Group chat is an export, not a home",
        text: "If a team insists on WhatsApp, Vardiya can post the open shift as a structured message. The source of truth stays on the board so the chat cannot fork reality.",
      },
    ],
    next: "Station tags (bar / floor / kitchen) and a quiet fairness hint so the same three people are not the only ones covering Sunday nights.",
  },
  {
    slug: "kiyi",
    title: "Kıyı",
    year: "2025",
    role: "Design, engineering",
    kind: "Independent study",
    stack: ["Next.js", "MapLibre", "SQLite"],
    summary:
      "A walking notebook for one stretch of coast — notes, light, and the way back.",
    lede: "Most map apps want a destination. Kıyı is for the days you already know the water is there and you only need a place to leave a sentence, a time of day, and whether the path was open.",
    cover: {
      motif: "coast",
      caption: "Horizon, a path, a tide line.",
    },
    sections: [
      {
        heading: "The problem",
        body: "Walking apps count kilometres. Photo apps bury the path under filters. Neither is useful six months later when you want to know: was this stretch lit after seventeen hundred, did the café on the corner still put chairs outside, and which turning actually reached the shore.",
      },
      {
        heading: "Who it is for",
        body: "Mostly myself, then anyone who walks the same water repeatedly — Bosphorus weekends, Aegean towns in shoulder season. The unit is a stretch, not a city. You pick a coastline measured in hours, not in districts.",
      },
      {
        heading: "Constraints",
        body: "Notes are private by default. A stretch has a beginning and an end you can name in speech. The map is a drawing, not a satellite brag. If the phone has no signal, you can still write, and the pin waits.",
      },
    ],
    decisions: [
      {
        title: "Time of day is a field, not metadata",
        text: "Light changes the walk. Every note asks morning / afternoon / dusk / night so the archive can be read as a climate, not a list of captions.",
      },
      {
        title: "A path is a sentence",
        text: "You save a stretch by walking it, then giving it a name you would text a friend: “Karaköy to Ortaköy, sea on the left.” Coordinates stay in the file. Language stays in the index.",
      },
      {
        title: "No social layer",
        text: "There are no likes and no public leaderboard of steps. If a note is worth sharing, it exports as a short letter, not a post.",
      },
    ],
    next: "A printed booklet mode — one stretch, one weekend, the notes set in type like a tide table.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}
