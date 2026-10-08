# After the Form

Site for aftertheform.com. Next.js 16 (App Router), TypeScript, Tailwind 4. Hosted on Cloudflare Workers through the
OpenNext adapter (`@opennextjs/cloudflare`); it still builds and runs on Vercel or `next start` unchanged.

## Run locally

```bash
npm install                  # Node 22 (see .nvmrc; wrangler needs it)
cp .env.example .env.local   # values are optional locally
npm run dev                  # http://localhost:3000
```

`npm run build` runs `scripts/check-placeholders.mjs` first and **fails while any placeholder remains**. It is skipped
only on preview builds: Vercel previews (`VERCEL_ENV=preview`) and Cloudflare Workers Builds of any branch other than
`main` (`WORKERS_CI_BRANCH`). Production and local builds enforce it.

## Environment variables

| Name | Where | Purpose |
|---|---|---|
| `SEQUENZY_API_KEY` | Runtime secret (Cloudflare: Worker > Settings > Variables and Secrets, or `npx wrangler secret put SEQUENZY_API_KEY`) | Server-only. Used by `app/api/request/route.ts`. Never `NEXT_PUBLIC_`. Without it the form shows its error state. |
| `NEXT_PUBLIC_CAL_URL` | Build variable, optional | Overrides the confirmed Cal.com link in `app/site.config.ts`. Must be a `https://cal.com/` link. |
| `SITE_INDEXABLE` | Build variable, optional | `1` makes a build indexable. Not needed on Cloudflare: the Workers Builds build of `main` is indexable automatically; every other build sends `noindex`. |

## Deploy (Cloudflare Workers)

| Command | What it does |
|---|---|
| `npm run cf:build` | `next build` (with the placeholder check), then the OpenNext Worker bundle in `.open-next/` |
| `npm run cf:preview` | Build, then serve it locally in the Workers runtime (wrangler dev, http://localhost:8787) |
| `npm run cf:deploy` | Build and deploy to Cloudflare (needs a logged-in wrangler or Workers Builds) |
| `npm run images` | Re-create the pre-sized AVIF and WebP files in `public/_img/` after adding or changing an image |

Workers Builds settings: build command `npx opennextjs-cloudflare build`, deploy command `npx opennextjs-cloudflare deploy`,
preview command `npx opennextjs-cloudflare upload`, production branch `main`. Config: `wrangler.jsonc`,
`open-next.config.ts`, `public/_headers`. No R2, KV, D1, Durable Objects or Images binding is used.

## Where things live

| Thing | File |
|---|---|
| Site facts and every open placeholder (the one file Matt edits) | `app/site.config.ts` |
| Placeholder check | `scripts/check-placeholders.mjs` |
| Design tokens, base layer, components (Tailwind 4 `@theme`) | `app/globals.css` |
| Fonts (Archivo, Azeret Mono, self-hosted) | `app/fonts/`, `app/layout.tsx` |
| Home page copy and JSON-LD (Organization, WebSite, Service) | `app/page.tsx` |
| Header, footer, CTAs, FAQ, shared UI | `app/components/header.tsx`, `footer.tsx`, `cta.tsx`, `faq.tsx`, `ui.tsx` |
| Graphics C1 to C4 | `app/components/c1-report.tsx`, `c2` in `app/page.tsx`, `c3-finding.tsx`, `c4-count.tsx` |
| Motion A1 to A3 (CSS, play-once script, reduced motion, pause) | `app/components/a1-lead-to-bid.tsx`, `a2-secondary-to-primary.tsx`, `a3-change-log.tsx`, `app/motion.css`, `app/motion-script.ts` |
| Mocks in "What we check" | `app/components/mocks.tsx` |
| Sample report, teardown, privacy, terms, 404 | `app/sample-report/`, `app/teardown/`, `app/privacy/`, `app/terms/`, `app/not-found.tsx` |
| Form UI and messages | `app/components/request-form.tsx` |
| Validation (client and server) | `app/validate.ts` |
| Form endpoint (honeypot, Sequenzy, `enrollInSequences: false`) | `app/api/request/route.ts` |
| Page metadata helper (title, description, canonical, OG, Twitter) | `app/seo.ts` |
| Root metadata, GTM (`GTM-NCSN8BLM`, deferred) and consent defaults | `app/layout.tsx` |
| Consent banner and Cookie settings | `app/components/consent-banner.tsx`, `app/components/cookie-settings.tsx` |
| robots.txt, sitemap.xml | `app/robots.ts`, `app/sitemap.ts` |
| OG and Twitter image (static) with alt text | `app/opengraph-image.png`, `app/twitter-image.png`, `*.alt.txt` |
| Icons ("AF") | `app/icon.tsx`, `app/apple-icon.tsx` |
| Security headers, apex to www redirect, image loader config | `next.config.ts` |
| Static image loader and sizes | `app/image-loader.ts`, `images.manifest.json`, `scripts/build-images.mjs` |
| Cloudflare | `wrangler.jsonc`, `open-next.config.ts`, `public/_headers` |

## Remaining placeholders

`npm run build` fails until these are filled in `app/site.config.ts`:

| ID | Setting | Where it shows | Status |
|---|---|---|---|
| P1 | `experienceLine` | C2 personal card | Filled with option B, pending Matt's final OK |
| P2 | `replyTime` | C2 "Reply time" | Filled: Within one business day |
| P3 | `calUrl` / `NEXT_PUBLIC_CAL_URL` | every "Book" CTA | Filled: https://cal.com/aftertheform/20min-fit |
| P4 | `public/matt.jpg`, `headshotConfirmed` | hero pill, C2 | Confirmed (current headshot) |
| P5 | `certifications` | C2 | None; line hidden |
| P6 | `c3Label` (and an optional test-account screenshot) | C3 | Default label "Example data, fictional account" |
| P7 | `governingLaw` | Terms clause 12 | Filled: New Mexico (12.1 to 12.4) |
| P8 | `dpaPosition` | Terms clause 9.6 | **Placeholder**, blocks the build |
| P9 | `terms13Pending` | after Terms clause 13 | **Placeholder**, blocks the build (set to `""` once the clause is final) |
| P10 | `privacyLastUpdated`, `termsLastUpdated` | Privacy and Terms headers | **Placeholder**, blocks the build; fill with the publish date |
| P11 | `caseStudy` | Proof | `null`, fallback copy shown |
| P12 | `workingFilesTools` | Privacy, "Who we share it with" | **Placeholder**, blocks the build |

Never write a double-brace token in comments under `app/`: the check matches it.

## Tests and checks

- `npx next build`: every page static except `/api/request`.
- `npx eslint app`, `npx tsc --noEmit`.
- `npm run cf:preview`, then open http://localhost:8787 (Workers runtime).
- Placeholder check on its own: `node scripts/check-placeholders.mjs`.
- `scripts/*.mjs` dev helpers use puppeteer-core with a local Chrome.

## Notes

- Sequenzy custom attributes sent: `fullName`, `note`, `requestType`, `source`, `website`, plus `marketingHubTier` for check requests. Leads are not enrolled in sequences.
- No HubSpot tracking code: submissions go to Sequenzy, not HubSpot.
- Analytics: GA4 only, through the existing GTM container, loaded after the page load event. The CSP allows only the GA4 hosts.
