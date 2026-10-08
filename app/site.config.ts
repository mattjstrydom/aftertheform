// Site facts and every open placeholder. scripts/check-placeholders.mjs fails the
// production build while any double-brace token is left in app/.
export type Cert = { name: string; verifyUrl: string };
export type CaseStudy = { title: string; body: string; attribution: string };

export const site = {
  url: "https://www.aftertheform.com",
  email: "hello@aftertheform.com",
  linkedin: "https://www.linkedin.com/in/mattstrydom",
  // Confirmed by Matt (8 Oct 2026). NEXT_PUBLIC_CAL_URL overrides it at build time if the event ever changes.
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/aftertheform/20min-fit",
  // Only the production build is indexable: the Cloudflare Workers Builds build of main, or any build with
  // SITE_INDEXABLE=1. VERCEL_ENV keeps a Vercel production build working. Keep in step with next.config.ts.
  indexable:
    process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "1" || process.env.WORKERS_CI_BRANCH === "main",

  // Option B from matt-decisions-drafts.md section 1, pending Matt's final OK. Swap the string to change it.
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
  dpaPosition: "{{DPA_POSITION}}", // Terms 9.6: placeholder until Steve sends the final text
  terms13Pending: "{{TERMS_13_CONFIRM}}", // Terms 13: placeholder until Steve sends the final text
  // Privacy "Who we share it with": where working files and recordings are stored (Matt's own tools, never an employer's).
  workingFilesTools: "{{WORKING_FILES_TOOLS}}",
  privacyLastUpdated: "{{PRIVACY_LAST_UPDATED}}",
  termsLastUpdated: "{{TERMS_LAST_UPDATED}}",

  headshotConfirmed: true, // Matt confirmed the current public/matt.jpg (8 Oct 2026)
  certifications: [] as Cert[], // none for now (Matt, 8 Oct 2026); the line stays hidden while empty
  c3Label: "Example data, fictional account",
  caseStudy: null as CaseStudy | null,
};
