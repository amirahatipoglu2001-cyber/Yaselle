# Amira Hatipoğlu — studio

Personal portfolio for Amira Hatipoğlu: an editorial index of independent product studies, a written approach, and a contact form.

See [`portfolioplan.md`](./portfolioplan.md) for the locked decisions behind the site.

## What you can do here

- Read selected studies on the home page and at `/work`
- Open a case study at `/work/sahaf`, `/work/vardiya`, or `/work/kiyi`
- Read the approach on `/about`
- Send a note on `/contact` (validated locally, delivered via your mail client)

Edit copy in `src/content/profile.ts` and `src/content/projects.ts`. The pages, metadata, and index all read from those files.

## Run locally

```bash
npm install
npm run dev -- --port 43217 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

```bash
npm run lint
npm run build
```

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
