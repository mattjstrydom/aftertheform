// Site facts and every open placeholder. scripts/check-placeholders.mjs fails the
// production build while any double-brace token is left in app/.
export type Cert = { name: string; verifyUrl: string };
export type CaseStudy = { title: string; body: string; attribution: string };

export const site = {
  url: "https://www.aftertheform.com",
  email: "hello@aftertheform.com",
  linkedin: "https://www.linkedin.com/in/mattstrydom",
  calUrl: process.env.NEXT_PUBLIC_CAL_URL ?? "#book",
  indexable: process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "1",

  experienceLine: "{{EXPERIENCE_LINE}}",
  replyTime: "{{REPLY_TIME}}",
  governingLaw: "{{GOVERNING_LAW}}",
  dpaPosition: "{{DPA_POSITION}}",
  terms13Pending: "{{TERMS_13_CONFIRM}}",
  privacyLastUpdated: "{{PRIVACY_LAST_UPDATED}}",
  termsLastUpdated: "{{TERMS_LAST_UPDATED}}",

  headshotConfirmed: false, // warning only
  certifications: [] as Cert[], // hidden when empty
  c3Label: "Example data, fictional account",
  caseStudy: null as CaseStudy | null,
};
