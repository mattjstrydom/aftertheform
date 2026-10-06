# After the Form

One-page site for aftertheform.com. Next.js (App Router), TypeScript, Tailwind, deployed on Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # add SEQUENZY_API_KEY
npm run dev                  # http://localhost:3000
```

`npm run build` runs `scripts/check-placeholders.mjs` first and **fails while any placeholder remains**. It is skipped only on Vercel preview deployments (`VERCEL_ENV=preview`); production and local builds enforce it.

## Deploy

Push to a private GitHub repo, import it in Vercel, set `SEQUENZY_API_KEY` in the project's environment variables. Domain: aftertheform.com.

## Where things live

| Thing | File |
|---|---|
| All page copy (hero to footer) | `app/page.tsx` |
| Hero animation (markup / CSS / text alternative) | `app/hero-flow.tsx`, `app/hero-flow.module.css` |
| Form UI and its messages | `app/components/request-form.tsx` |
| Validation (shared client + server) | `app/validate.ts` |
| Form endpoint (honeypot, Sequenzy `POST /subscribers`, `enrollInSequences: false`) | `app/api/request/route.ts` |
| Title, description, canonical, Open Graph | `app/layout.tsx` |
| GTM (`GTM-NCSN8BLM`) + Consent Mode defaults | `app/layout.tsx` (inline script, runs before GTM) |
| Consent banner (Accept / Decline) | `app/components/consent-banner.tsx` |
| Mocks in "What I check" | `app/components/mocks.tsx` |
| Privacy policy / sample report (fictional example) | `app/privacy/page.tsx`, `app/sample-report/page.tsx` |
| Favicon ("AF"), OG image (wordmark only, placeholder) | `app/icon.tsx`, `app/opengraph-image.tsx` |

## Remaining placeholders (production build fails until gone)

Every `<Ph>` in `app/` is one. Currently, all in the "Who does the work" section of `app/page.tsx`:

- `[7+]` years
- `[One specific thing Matt built...]`
- Call times (`[in US Eastern late morning to early afternoon]`)

The OG image is a wordmark-only placeholder (not enforced by the check). The sample report (`app/sample-report/page.tsx`) is a fictional example, labelled as such.

## Notes

- Sequenzy custom attributes sent: `fullName`, `website`, `marketingHubTier`, `note`, `source`. Leads are **not** enrolled in sequences.
- No HubSpot tracking code or `hutk` cookie: submissions go to Sequenzy, not HubSpot.
- `scripts/shots.mjs`, `formtest.mjs`, `reduced.mjs`, `crop.mjs` are dev helpers (puppeteer-core + local Chrome).
