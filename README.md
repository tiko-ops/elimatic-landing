# Elimatic website

Marketing site for Elimatic. Next.js (App Router), TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run lint`, `npm run typecheck`, `npm run build`, `npm start`.

## Where things live

| What | Where |
| --- | --- |
| Contact email, site URL, company details, title and description | `lib/site.ts` |
| Landing page sections | `components/Hero.tsx`, `components/sections/*` |
| Hero coin stacks | `components/HeroVisual.tsx` |
| Interactive savings chart | `components/SavingsChart.tsx` |
| Experience strip (company names) | `components/sections/LogoMarquee.tsx` |
| Demo request form | `components/ContactForm.tsx` |
| Form API (validation, honeypot, rate limit, email via one.com) | `app/api/contact/route.ts` |
| Privacy, terms and cookie pages | `app/privacy`, `app/terms`, `app/cookies` |
| Colors, type scale, motion | `app/globals.css` |
| Fonts (self-hosted, no network calls) | `app/fonts.ts`, `app/fonts/` |
| Open-source credits, licenses and logo sources | `THIRD_PARTY_NOTICES.md` |

## Experience strip

The "With experience from" strip shows company names as plain text. Edit the list in
`components/sections/LogoMarquee.tsx`.

## Demo requests

Each valid submission is appended as one JSON line to `data/submissions.jsonl`
(git-ignored) and logged to the server console.

Each request is also emailed to contact@elimatic.se, sent through that same
one.com mailbox:

1. Copy `.env.example` to `.env.local` (it already contains send.one.com,
   port 465 and contact@elimatic.se).
2. Fill in `SMTP_PASS` with the mailbox password.
3. Restart the dev server.

Without a password set, nothing is emailed and requests are only saved to the file.
If sending fails, the request is still saved and the error is logged.

## Before deploying

- Fill in `company` (legal name, organisation number, address) in `lib/site.ts`.
  It appears in the footer, the legal pages and the structured data.
- Have the privacy policy and terms reviewed, and add governing law to the terms.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain (used for canonical URLs,
  sitemap, robots, Open Graph and structured data).
- Serverless hosts have no persistent disk, so `data/submissions.jsonl` will not
  persist there. Enable email (above) or swap the file write for a database.
- The rate limiter is in-memory per server instance. For multiple instances use
  a shared store (e.g. Redis/Upstash).
