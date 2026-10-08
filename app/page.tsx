import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import "./motion.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq, { type FaqItem } from "./components/faq";
import { CalButton, SampleButton } from "./components/cta";
import { Accent, Chip, SectionHead, Tick, TickList } from "./components/ui";
import { Slot } from "./components/ph";
import { ConsentMock, ConversionMock, CookieMock } from "./components/mocks";
import A1LeadToBid from "./components/a1-lead-to-bid";
import A2SecondaryToPrimary from "./components/a2-secondary-to-primary";
import A3ChangeLog from "./components/a3-change-log";
import C1Report from "./components/c1-report";
import C3Finding from "./components/c3-finding";
import C4Count from "./components/c4-count";
import { site } from "./site.config";
import { motionScript } from "./motion-script";

const description =
  "We fix the HubSpot to Google Ads connection so Smart Bidding learns from the leads your sales team qualifies, not form fills. $1,200, fixed.";

export const metadata: Metadata = {
  title: { absolute: "After the Form | Make Google Ads bid on pipeline" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "After the Form",
    locale: "en_ZA",
    type: "website",
    url: "/",
    title: "After the Form | Make Google Ads bid on pipeline",
    description,
  },
  twitter: { card: "summary_large_image", title: "After the Form | Make Google Ads bid on pipeline", description },
};

const checks: { q: string; more?: string; mock?: React.ReactNode }[] = [
  { q: "Which conversions is Smart Bidding actually optimising for, and which are duplicates, tests or leftovers?", mock: <ConversionMock /> },
  {
    q: "Are your lifecycle stages (MQL, SQL, opportunity, customer) set up as conversions, included in your goals, firing, and carrying the right value?",
    more: "When a stage uses the deal amount, HubSpot sends the weighted amount of the most recent associated deal, not the full amount.",
  },
  { q: "Is any stage sent more than once, through HubSpot, Data Manager or a Zapier automation?" },
  {
    q: "Does each contact reach Google with a click ID or contact data (email, phone or address), so it can be matched to an ad click? And is Google's combined enhanced conversions setting switched on?",
    mock: <CookieMock />,
  },
  { q: "Is anything still on legacy offline import or a custom API upload, or routed through a manager account that HubSpot can't connect?" },
  { q: "Are consent signals set correctly for traffic from the EEA, where Google requires them?", mock: <ConsentMock /> },
  { q: "For the same period, how do HubSpot's stage changes and Google Ads' conversions compare, and what explains the gap?" },
];

const included = [
  "A written report, with a screenshot for every finding",
  "A change log of everything we touched, with how to reverse each change",
  "A recorded screen walkthrough of the findings",
  "A 30-minute handover call",
  "A free recheck of your counts and sync status at day 30",
];

const steps: [string, React.ReactNode][] = [
  ["Fit call, 20 minutes.", "Tell us your website and Marketing Hub tier. If it's not a fit, we'll say so on the call."],
  [
    "Kickoff.",
    <>
      You pay 50% by Stripe invoice and invite us to Google Ads, HubSpot and, if needed, Tag Manager (see “<Link href="#access" className="link">Access and security</Link>”).
    </>,
  ],
  ["Check and proposal.", "We run the seven checks and send the proposed changes for your approval."],
  ["Fix and report.", "We make the approved changes and deliver the report within 7 business days of access, not counting time waiting for your approval. The second 50% is due on delivery."],
  ["Handover.", "A 30-minute call and the recorded walkthrough."],
  ["Day 30 recheck, free.", "We check your counts and sync status again. On long B2B sales cycles, the full effect on bidding can take longer than 30 days."],
];

const priceTerms = [
  "Half when work starts, half when the report is delivered, by Stripe invoice.",
  "Covers everything on the check and fix lists. Anything outside them is quoted before any work starts.",
  "If none of the seven checks finds anything that needs changing, you pay only the first half and keep the report.",
  "Delivered within 7 business days of access, not counting time waiting for your approval.",
];

const accessMine = [
  "Named user invites only, never shared passwords. My accounts use two-step login.",
  "I use only the access the work needs. I don't export or copy contact records.",
  "Every change is logged with how to reverse it, and nothing changes without your approval.",
  "You can revoke my access at any time. I remove it at handover unless you're on the monthly plan.",
];

const plans: [string, string, string][] = [
  ["Up to 3", "$1,500 a month", "up to 3 client accounts"],
  ["Up to 5", "$2,500 a month", "up to 5 client accounts"],
  ["Extra accounts", "$400 a month each", "above your plan"],
];

const monthly = [
  "Monthly checks of the HubSpot to Google Ads connection: sync errors, the gap between HubSpot and Google Ads counts, click ID coverage, changes to Primary conversions, and consent signals.",
  "A white-label monthly note on what changed and what needs a decision.",
  "Fixes for anything that breaks, up to 1.5 hours per account a month.",
];

const pilot: React.ReactNode[] = [
  <>
    <strong className="font-medium">$900</strong> with a short case study and a 20-minute debrief, or <strong className="font-medium">$1,200</strong> without. The case study uses wording you approve.
  </>,
  "One HubSpot portal and one Google Ads account, the client's own account rather than a manager account.",
  "The seven checks, with fixes in HubSpot, Google Ads and Tag Manager settings.",
  "White-label report, change log with undo steps, recorded walkthrough and a 30-minute handover with your team.",
  "Free day 30 recheck. If you join the monthly plan within 14 days of the recheck, the pilot fee comes off your first month.",
];

const working = [
  "HubSpot's sync status shows no error.",
  "Google Ads conversion diagnostics show it as active, with no error.",
  "It's set as Primary or Secondary, as agreed in the report.",
  "A test contact we move through that stage is recorded.",
];

const notIncluded = [
  "Code changes on your website outside Tag Manager",
  "Redesigning lifecycle stages or lead scoring (we'll flag problems and quote separately)",
  "Campaign management, keywords or ad copy",
  "Salesforce as your CRM",
  "Syncs run from a Google Ads manager account",
];

const accessNeeds: [string, string][] = [
  ["Google Ads:", "Admin on your individual Google Ads account. HubSpot needs Admin on the individual account to connect it, and it can't connect manager accounts."],
  ["HubSpot:", "Super Admin is easiest. At minimum we need Publish access to the ads tools (HubSpot's requirement for connecting ad accounts), plus edit access to properties, workflows and lifecycle settings."],
  ["Tag Manager:", "Publish on the container, only if the fix list touches tags."],
];

const accessOurs = [
  "Named user invites only, never shared passwords. Our accounts use two-step login.",
  "You can revoke our access at any time.",
  "We use only the access the work needs. We don't export or copy contact records, and screenshots blur personal data.",
  "Working files are deleted within 30 days of the work ending.",
  "We remove our access at handover unless you're on the monthly plan.",
];

const faqs: FaqItem[] = [
  {
    q: "Do I need Marketing Hub Professional?",
    a: "No. Marketing Hub Starter supports lifecycle stage conversion events too, up to five events. Professional allows up to 50 and Enterprise up to 100.",
  },
  {
    q: "Will this disrupt my campaigns?",
    a: "Changing primary conversions changes what Smart Bidding optimises for. That's the point of the work. Google says bidding takes 1 to 2 conversion cycles in most cases to relearn after a change, so we agree each change and its timing with you before we make it.",
  },
  {
    q: "Does lead volume matter?",
    a: "Yes. Google says the learning period depends on the number of conversions, and suggests judging performance over the last 30 days with at least 30 conversions. If a qualified stage only gets a handful a month, we'll tell you in the report.",
  },
  {
    q: "Will past leads be fixed too?",
    a: "HubSpot's own sync only counts stage changes that happen after an event is created. If the fix uses Google's Data Manager connection, Google imports the last 14 days of HubSpot data on the first run. Either way, results count from handover forward.",
  },
  {
    q: "Will my HubSpot and Google Ads counts match after the fix?",
    a: "Not necessarily. HubSpot says the totals may not match because Google calculates each metric differently. We explain the gap in the report and fix the parts that are errors.",
  },
  {
    q: "Do you work with agencies?",
    a: (
      <>
        Yes. Agencies can buy a check for a client and deliver it under their own name. See “<Link href="#agencies" className="link">For agencies: the pilot</Link>”.
      </>
    ),
  },
  {
    q: "What access do you need, and is it safe?",
    a: (
      <>
        Admin on your individual Google Ads account, Publish access to HubSpot&apos;s ads tools at minimum, and Tag Manager only if a tag needs changing. Named invites only, every change logged with how to reverse it. See “<Link href="#access" className="link">Access and security</Link>”.
      </>
    ),
  },
  {
    q: "Will you change our website?",
    a: "No. We work in Google Ads, HubSpot and Tag Manager settings. Code changes outside Tag Manager aren't included.",
  },
  {
    q: "What happens after handover?",
    a: "Every change is in the change log, and we recheck your counts for free at day 30. If you'd like us to keep watching the connection, that's the monthly plan. We remove our access at handover unless you're on the monthly plan.",
  },
  {
    q: "Where are you based, and how do we pay?",
    a: "Matt works from South Africa. After the Form is a service of Reubika LLC, a US company. We invoice in USD through Stripe.",
  },
];

const ORG = "https://www.aftertheform.com/#organization";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: "After the Form",
      legalName: "Reubika LLC",
      url: "https://www.aftertheform.com",
      email: "hello@aftertheform.com",
      description: "A fixed-price check and fix of the HubSpot to Google Ads connection, so Smart Bidding learns from qualified leads.",
      founder: { "@type": "Person", "@id": "https://www.aftertheform.com/#matt", name: "Matt Strydom", sameAs: ["https://www.linkedin.com/in/mattstrydom"] },
    },
    { "@type": "WebSite", "@id": "https://www.aftertheform.com/#website", url: "https://www.aftertheform.com", name: "After the Form", inLanguage: "en-ZA", publisher: { "@id": ORG } },
    {
      "@type": "Service",
      "@id": "https://www.aftertheform.com/#check",
      name: "HubSpot to Google Ads conversion check and fix",
      serviceType: "Conversion tracking audit and fix",
      provider: { "@id": ORG },
      description:
        "Seven checks of the HubSpot to Google Ads connection, fixes to the settings that need changing, a report, a change log with how to reverse each change, and a day 30 recheck.",
      offers: { "@type": "Offer", price: "1200", priceCurrency: "USD", url: "https://www.aftertheform.com/#pricing" },
    },
  ],
};

const rowLine = "border-t border-gray-100 first:border-0";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main" tabIndex={-1}>
        {/* 1. Hero */}
        <section id="hero" aria-labelledby="hero-title">
          <div className="container-site grid grid-cols-1 items-center gap-12 pb-16 pt-14 lg:min-h-[806px] lg:grid-cols-[1.4fr_1fr] lg:gap-5 lg:py-0">
            <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <p className="chip">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
                  <circle cx="6" cy="12" r="2.5" />
                  <circle cx="18" cy="12" r="2.5" />
                  <path d="M8.5 12h7" />
                  <path d="M13.5 9.5l2 2.5-2 2.5" />
                </svg>
                HubSpot to Google Ads conversion fix
              </p>
              <h1 id="hero-title" className="text-title-xl max-w-[744px]">
                Google Ads should bid on pipeline, <Accent>not form fills.</Accent>
              </h1>
              <p className="text-text-l max-w-[33.75rem]">
                We fix the connection between HubSpot and Google Ads, so Smart Bidding can learn from the leads your sales team qualifies. Fixed price, fixed scope, delivered within 7 business days of access.
              </p>
              <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <CalButton className="w-full sm:w-auto" />
                <SampleButton className="w-full sm:w-auto" />
              </div>
              <p className="text-text-m text-gray-600 max-w-[33.75rem]">
                <span className="font-medium text-black">$1,200 fixed.</span> If none of our seven checks finds anything that needs changing, you pay only the first half and keep the report.
              </p>
              <div className="flex items-center gap-3 rounded-pill bg-white py-2 pl-2 pr-5">
                <Image src="/matt.jpg" alt="" width={40} height={40} sizes="40px" className="size-10 rounded-full object-cover" />
                <p className="text-left text-[0.875rem] leading-[1.3] tracking-[-0.02em]">
                  <span className="font-medium">Matt Strydom</span>
                  <br />
                  <span className="text-gray-600">On your fit call and in your account</span>
                </p>
              </div>
            </div>
            <A1LeadToBid />
          </div>
        </section>

        {/* 2. The problem */}
        <section id="problem" aria-labelledby="problem-title" className="section-y">
          <div className="container-site">
            <SectionHead id="problem" chip="The problem">
              Smart Bidding can only learn <Accent>from what you tell it</Accent>
            </SectionHead>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <div className="bento text-text-l">
                <p>If your primary conversion is a form fill, Google Ads goes looking for more form fills. It can&apos;t see which of those leads your sales team qualified and which went nowhere.</p>
              </div>
              <div className="bento space-y-4 text-text-m">
                <p>
                  The fix exists. HubSpot can send lifecycle stages to Google Ads as conversions, and Google Ads can pull them in through Data Manager. But Google only bids on a conversion that is set as Primary and sits in a goal your campaigns use. So a connection can sync without those stages ever being used for bidding.
                </p>
                <p>And when the numbers disagree, HubSpot&apos;s own documentation says the totals may not match Google&apos;s. HubSpot Support won&apos;t investigate the gap unless there&apos;s a sync error.</p>
              </div>
              <div className="bento-dark on-dark text-text-m">
                <p>
                  If your setup still uses offline conversion import, there&apos;s one more reason to look. Google calls it a legacy feature and recommends enhanced conversions for leads. Since 15 June 2026, Google has moved offline conversion uploads to its Data Manager API and blocks them in the Google Ads API.
                </p>
              </div>
            </div>
            <C4Count />
          </div>
        </section>

        {/* 3. Seven questions */}
        <section id="checks" aria-labelledby="checks-title" className="section-y">
          <div className="container-site">
            <SectionHead id="checks" chip="The check">
              Seven questions we answer <Accent>in every check</Accent>
            </SectionHead>
            <ol className="bento mt-10">
              {checks.map(({ q, more, mock }, i) => (
                <li key={q} className="grid gap-4 border-t border-gray-100 py-6 first:border-0 first:pt-0 last:pb-0 lg:grid-cols-[1fr_22rem] lg:gap-12">
                  <div className="max-w-[64ch]">
                    <p className="font-mono text-[12px] leading-[1.3] tracking-normal text-gray-600" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-text-l">
                      <span className="font-medium">{q}</span>
                      {more && <> {more}</>}
                    </p>
                  </div>
                  {mock && <div>{mock}</div>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. We fix it */}
        <section id="fix" aria-labelledby="fix-title" className="section-y">
          <div className="container-site">
            <SectionHead id="fix" chip="Sign-off">
              We fix it, <Accent>with your sign-off</Accent>
            </SectionHead>
            <div className="mt-6 max-w-[64ch] space-y-4 text-text-l">
              <p>We fix everything on the list that lives in Google Ads, HubSpot or Tag Manager settings. You see every proposed change before we make it, and nothing changes without your approval.</p>
              <p>You also choose when bidding changes go live. Google says Smart Bidding takes some time to relearn after a change to conversion goals or actions (1 to 2 conversion cycles in most cases).</p>
            </div>
            <C3Finding />
            <A2SecondaryToPrimary />
          </div>
        </section>

        {/* 5. What you get */}
        <section id="what-you-get" aria-labelledby="what-you-get-title" className="section-y">
          <div className="container-site">
            <SectionHead id="what-you-get" chip="What you get">
              See exactly what you&apos;ll get <Accent>before you pay</Accent>
            </SectionHead>
            <div className="bento mt-10 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <p className="text-text-l max-w-[33.75rem]">Our sample report is built on a fictional account, finding by finding: what we saw, why it matters, the change, and how to reverse it.</p>
                <SampleButton className="mt-6">Read the sample report</SampleButton>
              </div>
              <ul className="text-text-l">
                {included.map((t) => (
                  <li key={t} className="flex gap-3 border-t border-gray-100 py-4 first:border-0 first:pt-0">
                    <Tick className="mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <C1Report />
          </div>
        </section>

        {/* 6. How it works */}
        <section id="how" aria-labelledby="how-title" className="section-y">
          <div className="container-site">
            <SectionHead id="how" chip="How it works">How it works</SectionHead>
            <div className="mt-10 grid gap-5 lg:grid-cols-[5fr_7fr] lg:items-start">
              <ol>
                {steps.map(([lead, rest], i) => (
                  <li key={lead} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-gray-200 py-5 last:border-b">
                    <span className="text-title-s text-green-500" aria-hidden="true">{i + 1}</span>
                    <p className="text-text-m">
                      <span className="font-medium">{lead}</span> {rest}
                    </p>
                  </li>
                ))}
              </ol>
              <A3ChangeLog />
            </div>
          </div>
        </section>

        {/* 7. Pricing (C2) and monthly plan */}
        <section id="pricing" aria-labelledby="pricing-title" className="section-y">
          <span id="price" aria-hidden="true" />
          <div className="container-site">
            <Chip>Pricing</Chip>
            <h2 id="pricing-title" className="mt-4 max-w-[900px] text-title-l">
              One price.
              <br className="max-lg:hidden" /> <Accent>One person in your account.</Accent>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[5fr_7fr]">
              {/* Price card */}
              <div className="bento-dark on-dark flex flex-col p-6 sm:p-10">
                <p className="text-[1rem] font-medium tracking-[-0.02em] text-green-200">Check and fix</p>
                <p className="mt-3 text-[4rem] leading-none font-medium tracking-[-0.05em] sm:text-[5rem]">
                  $1,200<span className="text-[1.5rem] tracking-[-0.03em] text-green-200">, fixed</span>
                </p>
                <ul className="mt-8 text-[1rem] leading-[1.5] tracking-[-0.02em] text-white/90">
                  {priceTerms.map((t) => (
                    <li key={t} className="border-t border-white/15 py-3.5">{t}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-6">
                  <CalButton className="w-full sm:w-auto" />
                  <span className="text-[0.875rem] tracking-[-0.02em] text-green-200">Booked through Cal.com</span>
                </div>
              </div>

              {/* Personal card, first person */}
              <div className="bento p-6 sm:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <Image
                    src="/matt.jpg"
                    alt="Matt Strydom"
                    width={168}
                    height={168}
                    sizes="(min-width: 640px) 168px, 148px"
                    className="aspect-square w-[148px] shrink-0 rounded-tile object-cover sm:w-[168px]"
                  />
                  <div className="min-w-0">
                    <p className="text-title-m">Matt Strydom</p>
                    <p className="mt-2 text-text-l text-gray-800">I&apos;m the person on your fit call and the person working in your account. No handoffs.</p>
                    <p className="mt-3">
                      <Slot value={site.experienceLine} />
                    </p>
                    {site.certifications.length > 0 && (
                      <p className="mt-3 text-text-s text-gray-600">
                        Current certifications:{" "}
                        {site.certifications.map((c, i) => (
                          <span key={c.name}>
                            {i > 0 && ", "}
                            <a href={c.verifyUrl} className="link">
                              {c.name}
                              <span className="sr-only"> (verify)</span>
                            </a>
                          </span>
                        ))}
                      </p>
                    )}
                    <a href={site.linkedin} className="btn-quiet mt-4">Matt on LinkedIn</a>
                  </div>
                </div>

                <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-1 text-[1rem] leading-[1.5] tracking-[-0.02em] sm:grid-cols-[120px_1fr] sm:gap-y-3">
                  <dt className="text-gray-600">Company</dt>
                  <dd className="mb-3 sm:mb-0">After the Form is a service of Reubika LLC, USA. Invoices in USD through Stripe.</dd>
                  <dt className="text-gray-600">Reply time</dt>
                  <dd className="mb-3 sm:mb-0">
                    <Slot value={site.replyTime} />
                  </dd>
                  <dt className="text-gray-600">Booking</dt>
                  <dd>
                    <a href={site.calUrl} className="link">Book a 20-minute fit call</a> through Cal.com. If it&apos;s not a fit, I&apos;ll say so on the call.
                  </dd>
                </dl>

                <div className="mt-8 rounded-tile bg-green-100 p-5 sm:p-7">
                  <h3 className="text-title-xs">How I handle access</h3>
                  <TickList items={accessMine} className="mt-4 gap-x-8 md:grid-cols-2" itemClassName="text-[0.9375rem] leading-[1.45] tracking-[-0.01em] text-gray-800" />
                </div>
              </div>
            </div>

            {/* Monthly plan */}
            <div className="bento mt-5 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <h3 className="text-title-m">
                  Monthly plan: <Accent>we watch the connection for you</Accent>
                </h3>
                <p className="mt-4 text-text-l">A monitored-accounts plan, not an hours bank.</p>
              </div>
              <div className="min-w-0">
                <table className="w-full border-collapse text-left text-text-m">
                  <caption className="sr-only">Monthly plan prices</caption>
                  <thead>
                    <tr className="text-gray-600">
                      <th scope="col" className="py-3 pr-3 font-normal">Plan</th>
                      <th scope="col" className="px-3 py-3 font-normal">Price</th>
                      <th scope="col" className="py-3 pl-3 font-normal">Accounts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map(([p, price, acc]) => (
                      <tr key={p} className="border-t border-gray-100 align-top">
                        <th scope="row" className="py-3 pr-3 font-normal">{p}</th>
                        <td className="px-3 py-3 font-medium">{price}</td>
                        <td className="py-3 pl-3">{acc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-6 font-medium">On each account, every month:</p>
                <TickList items={monthly} className="mt-3" />
                <p className="mt-4 text-text-m text-gray-600">Other ops work (routing, clean-up, reporting, new builds) is quoted separately in blocks at $150 an hour, 5-hour minimum.</p>
                <p className="mt-4 text-text-m text-gray-600">3-month minimum, then month to month with 30 days&apos; notice. Billed monthly in advance by Stripe subscription.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. For agencies */}
        <section id="agencies" aria-labelledby="agencies-title" className="section-y">
          <div className="container-site">
            <SectionHead id="agencies" chip="For agencies">
              For agencies: <Accent>the pilot</Accent>
            </SectionHead>
            <div className="bento mt-10 grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <p className="text-text-l max-w-[33.75rem]">We&apos;re opening a small paid pilot for HubSpot partner agencies. It&apos;s one check and fix on one client account, delivered under your agency&apos;s name.</p>
                <CalButton className="mt-6 w-full sm:w-auto" />
              </div>
              <div>
                <TickList items={pilot} />
                <p className="mt-6 rounded-tile bg-gray-50 p-5">
                  White-label means our name appears nowhere in the deliverables. We never contact your client unless you invite us, and we don&apos;t sell directly to your clients for 12 months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. The fix cap */}
        <section id="promise" aria-labelledby="promise-title" className="section-y">
          <div className="container-site">
            <SectionHead id="promise" chip="The fix cap">
              If it isn&apos;t working at handover, <Accent>we keep going (within limits)</Accent>
            </SectionHead>
            <div className="bento mt-10 max-w-[64rem] space-y-5 text-text-m">
              <p>For each conversion action on the fix list, “working” means all four of these:</p>
              <ol className="grid gap-3">
                {working.map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-full bg-green-text text-[12px] leading-none font-semibold tracking-normal text-white" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <p>Working doesn&apos;t mean the HubSpot and Google Ads counts match. HubSpot&apos;s own documentation says the totals may not match.</p>
              <p>If something on the fix list isn&apos;t working at handover, we put in up to 10 extra hours within 30 days of handover at no extra cost. If an in-scope item still isn&apos;t working at that cap, we refund the second payment.</p>
              <p>
                This doesn&apos;t cover causes outside our scope (such as website code outside Tag Manager), changes made by you or your agency after handover, Google or HubSpot outages, or low lead volume. Full details are in our{" "}
                <Link href="/terms" className="link">terms</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* 10. Not included, and Access and security */}
        <section aria-label="Scope and access" className="section-y">
          <div className="container-site grid gap-5 lg:grid-cols-[5fr_7fr]">
            <div id="not-included" className="bento">
              <h2 className="text-title-m">Not included</h2>
              <ul className="mt-6 text-text-m">
                {notIncluded.map((t) => (
                  <li key={t} className={`py-3 first:pt-0 ${rowLine}`}>{t}</li>
                ))}
              </ul>
            </div>
            <div id="access" className="bento">
              <h2 className="text-title-m">Access and security</h2>
              <dl className="mt-6 space-y-3 text-text-m">
                {accessNeeds.map(([dt, dd]) => (
                  <div key={dt}>
                    <dt className="inline font-medium">{dt}</dt> <dd className="inline">{dd}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-medium">How we handle it:</p>
              <TickList items={accessOurs} className="mt-3 text-text-m" />
            </div>
          </div>
        </section>

        {/* 11. Proof */}
        <section id="proof" aria-labelledby="proof-title" className="section-y">
          <div className="container-site">
            <div className="bento">
              <h2 id="proof-title" className="text-title-m">Proof</h2>
              {site.caseStudy && (
                <div className="mt-4 max-w-[64ch] text-text-l">
                  <h3 className="text-title-xs">{site.caseStudy.title}</h3>
                  <p className="mt-2">{site.caseStudy.body}</p>
                  <p className="mt-2 text-gray-600">{site.caseStudy.attribution}</p>
                </div>
              )}
              <p className="mt-4 max-w-[64ch] text-text-l">
                {site.caseStudy ? "Until then, our " : "Our "}
                <Link href="/sample-report" className="link">sample report</Link> shows exactly what you receive. It&apos;s built on a fictional account: the company, figures and screenshots are illustrative, not a client result.
              </p>
            </div>
          </div>
        </section>

        {/* 12. Questions */}
        <section id="questions" aria-labelledby="questions-title" className="section-y">
          <div className="container-site">
            <SectionHead id="questions" chip="Questions">Questions</SectionHead>
            <div className="bento mt-10 py-3 sm:py-4">
              <Faq items={faqs} />
            </div>
          </div>
        </section>

        {/* 13. Final call to action */}
        <section id="request" aria-labelledby="request-title" className="section-y">
          <div className="container-site">
            <div className="bento-dark on-dark mx-auto max-w-[64rem] px-6 py-14 text-center sm:px-16 sm:py-20">
              <h2 id="request-title" className="text-title-l">
                See whether your stages are <Accent dark>being used for bidding</Accent>
              </h2>
              <CalButton className="mt-8 w-full sm:w-auto" />
              <p className="mt-6 text-white/90">
                Prefer email? <a href={`mailto:${site.email}`} className="link">{site.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Script id="motion" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: motionScript }} />
    </>
  );
}
