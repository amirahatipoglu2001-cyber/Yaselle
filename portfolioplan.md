# Amira Hatipoğlu — Portfolio Plan

A working studio site, not a template. Editorial, paper-and-ink, with three independent product studies and a real way to get in touch.

## Intent

Amira Hatipoğlu is building in public. This first slice is a complete personal portfolio: identity, selected work, a written approach, and contact. Content lives in typed files so the site can grow without rewriting layout.

The studies on the site are original product work — not invented client logos. They can be swapped for shipped projects later without changing the architecture.

## Locked decisions

| Setting | Value |
| --- | --- |
| Stack | Next.js (App Router), TypeScript, Tailwind v4, shadcn/ui |
| Theme | Light-only. Warm paper, dark ink, rust accent. No dark-mode toggle. |
| Type | Fraunces for display, Geist for body, Geist Mono for meta |
| Language | English, with Turkish product names and the spelling *Hatipoğlu* |
| Auth / database | None |
| Contact | Validated form → `/api/contact` → confirmation + `mailto:` fallback |
| Imagery | Typographic / geometric covers. No generated portraits. |
| Analytics | None |

## Site map

- `/` — Name, one-line positioning, selected work, current focus, close
- `/work` — Full index of studies
- `/work/[slug]` — Case study (context, constraint, decisions, next)
- `/about` — Bio, approach, tools, now
- `/contact` — Form with empty, error, and sent states
- Unmatched routes and unknown slugs — custom 404

## Visual system

- Background: warm paper (`oklch` cream)
- Ink: near-black with a brown bias
- Accent: oxidized rust for links, numbers, and primary actions
- Moss as a secondary field color on covers
- Large serif headlines, generous measure, hairline rules
- Desktop: identity column + reading column where it helps
- Mobile: sticky header, sheet navigation, stacked work cards

## Content model

`src/content/profile.ts` holds name, title, email, links, availability, tools, and bio.

`src/content/projects.ts` holds ordered studies: slug, year, role, stack, summary, and long-form sections.

Components render from this data. Copy is not hardcoded in JSX except structural chrome (nav labels, form UI).

## Selected studies (first slice)

1. **Sahaf** — Course-book exchange for university cities
2. **Vardiya** — Shift coverage without group-chat chaos
3. **Kıyı** — Walking notes for a stretch of coast

Each study is labeled as an independent product study and includes: problem, people, constraints, three design decisions, and what to build next.

## Quality bar

- Real copy. No lorem, no “welcome to my portfolio.”
- Empty, loading, and error states for contact and missing work
- Keyboard-visible focus, skip link, semantic landmarks
- Desktop and mobile layouts
- Content is the source of truth for titles and metadata

## How to edit

1. Change words in `src/content/`
2. Add a study object and it appears on `/` and `/work`
3. Replace studies with shipped work when you have it
