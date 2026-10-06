# After the Form

One-page site for aftertheform.com. Next.js (App Router), TypeScript, Tailwind, deployed on Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # add SEQUENZY_API_KEY
npm run dev                  # http://localhost:3000
```

`npm run build` runs `scripts/check-placeholders.mjs` first and **fails while any placeholder remains**. It is skipped only on Vercel preview deployments (`VERCEL_ENV=preview`); production and local builds enforce it.

## Environment variables

| Name | Purpose |
|---|---|
| `SEQUENZY_API_KEY` | Server-only. Used by `app/api/request/route.ts`. |
| `NEXT_PUBLIC_CAL_URL` | Cal.com booking page. Shows "Prefer to talk first? Book a 20-minute fit call" under the request form. If unset, the line is hidden. |

## Deploy

Push to a private GitHub repo, import it in Vercel, set `SEQUENZY_API_KEY` in the project's environment variables. Domain: aftertheform.com.

## Where things live

| Thing | File |
|---|---|
| All page copy (hero to footer) | `app/page.tsx` |
| Hero animation (markup / CSS / text alternative) | `app/hero-flow.tsx`, `app/hero-flow.module.css` |
| Form UI and its messages (check and teardown variants) | `app/components/request-form.tsx` |
| Free teardown page | `app/teardown/page.tsx` |
| Cookie settings link / reopening the banner | `app/components/cookie-settings.tsx`, `app/components/consent-banner.tsx` |
| JSON-LD (Organization, founder, Service) | `app/page.tsx` (`jsonLd`) |
| Validation (shared client + server) | `app/validate.ts` |
| Form endpoint (honeypot, Sequenzy `POST /subscribers`, `enrollInSequences: false`) | `app/api/request/route.ts` |
| Title, description, canonical, Open Graph | `app/layout.tsx` |
| GTM (`GTM-NCSN8BLM`) + Consent Mode defaults | `app/layout.tsx` (inline script, runs before GTM) |
| Consent banner (Accept / Decline) | `app/components/consent-banner.tsx` |
| Mocks in "What I check" | `app/components/mocks.tsx` |
| Privacy policy / sample report (fictional example) | `app/privacy/page.tsx`, `app/sample-report/page.tsx` |
| Favicon ("AF"), OG image (wordmark only, placeholder) | `app/icon.tsx`, `app/opengraph-image.tsx` |

## Remaining placeholders

None. `npm run build` passes the placeholder check. The OG image is a wordmark-only placeholder (not enforced by the check). The sample report (`app/sample-report/page.tsx`) is a fictional example, labelled as such.

## Update log (homepage copy refresh)

- Homepage copy replaced; seven check questions keep their mocks.
- Booking link under the form, driven by `NEXT_PUBLIC_CAL_URL`.
- Footer: Cookie settings (reopens the consent banner; Decline pushes a denied consent update) and Get a free teardown.
- Canonical, Open Graph URL and image use `https://www.aftertheform.com` on every page.
- Required attributes on form fields; skip-to-content link on every page.
- Shorter vertical hero animation on mobile and tighter spacing around it.
- `/teardown` page. Submissions go through the same Sequenzy route with the tag `teardown` (check requests get `check-request`).
- JSON-LD on the homepage. No FAQ markup.
- Sample report: one finding edited (Webflow demo form).

## Notes

- Sequenzy custom attributes sent: `fullName`, `note`, `requestType`, `source`, plus `website` and `marketingHubTier` (check) or `landingPage` (teardown). Leads are **not** enrolled in sequences.
- No HubSpot tracking code or `hutk` cookie: submissions go to Sequenzy, not HubSpot.
- `scripts/shots.mjs`, `formtest.mjs`, `reduced.mjs`, `crop.mjs` are dev helpers (puppeteer-core + local Chrome).
