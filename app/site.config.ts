// Site facts and every open placeholder. scripts/check-placeholders.mjs fails the
// production build while any double-brace token is left in app/.
export type Cert = { name: string; verifyUrl: string };
export type CaseStudy = { title: string; body: string; attribution: string };

export const site = {
  // Brand, domain, email and legal lines: the single source for copy, metadata, JSON-LD, terms, privacy, icons, the
  // generated headers and the form Worker (worker/index.ts). A rename is a change here plus re-rendering
  // public/og-image.png, whose text is baked into the image (see README, "Renaming").
  // Renamed from the old brand to Closed Logic (Matt, 9 Oct 2026). The old domain's 301 plan is in the dev report.
  brand: "Closed Logic",
  domain: "closedlogic.com", // apex; redirects to url (a Cloudflare redirect rule, see README)
  url: "https://www.closedlogic.com",
  // Placeholder: the mailbox isn't set up yet. scripts/check-placeholders.mjs blocks the production build until
  // emailLive is true, so the site never goes live showing an address that bounces.
  email: "hello@closedlogic.com",
  emailLive: false,
  // Where the form Worker sends new-lead notifications. Deliberately still the old, working inbox: switch it to `email`
  // only once hello@closedlogic.com receives mail and a test lead has been seen to arrive (README, "Renaming").
  notifyTo: "hello@aftertheform.com",
  legalName: "Reubika LLC",
  legalEntity: "Reubika LLC, a New Mexico limited liability company", // Terms 1.1
  // Footer, C2, FAQ and privacy: "Closed Logic is a trading name of Reubika LLC, a New Mexico limited liability company"
  get legalLine() {
    return `${this.brand} is a trading name of ${this.legalEntity}`;
  },
  linkedin: "https://www.linkedin.com/in/mattstrydom",
  // Confirmed by Matt (8 Oct 2026). The slug is the Cal.com account name, which still carries the old brand; it keeps
  // working after the rename. If Matt renames the Cal.com account, change it here (or set NEXT_PUBLIC_CAL_URL).
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/aftertheform/20min-fit",
  // Only the production build is indexable: the Cloudflare Workers Builds build of main, or any build with
  // SITE_INDEXABLE=1. VERCEL_ENV keeps a Vercel production build working.
  indexable:
    process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "1" || process.env.WORKERS_CI_BRANCH === "main",

  // Option B from matt-decisions-drafts.md section 1 (Steve: option B unless Matt says otherwise).
  experienceLine:
    "I've spent 7+ years across RevOps, go-to-market strategy, marketing automation and growth engineering, and I work hands-on in HubSpot and Google Tag Manager.",
  replyTime: "Within one business day",
  // Terms clause 12 (Reubika LLC is a New Mexico LLC), text from matt-decisions-drafts.md section 5.
  governingLaw: [
    "These terms, and any dispute arising from them, are governed by the laws of the State of New Mexico, USA, without regard to its conflict-of-law rules.",
    "Before starting legal proceedings, each of us will try in good faith to settle the dispute by email for 30 days.",
    "If the dispute isn't settled, the state and federal courts located in New Mexico have exclusive jurisdiction, and each of us submits to it.",
    "Nothing in this clause stops either of us from asking any court for urgent interim relief.",
  ],
  // Set both to the publish date at deploy, for example "12 October 2026".
  privacyLastUpdated: "{{PRIVACY_LAST_UPDATED}}",
  termsLastUpdated: "{{TERMS_LAST_UPDATED}}",

  headshotConfirmed: true, // Matt confirmed the current public/matt.jpg (8 Oct 2026)
  certifications: [] as Cert[], // none for now (Matt, 8 Oct 2026); the line stays hidden while empty
  c3Label: "Example data, fictional account",
  caseStudy: null as CaseStudy | null,
};
