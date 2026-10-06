import Image from "next/image";
import Link from "next/link";
import HeroFlow from "./hero-flow";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq from "./components/faq";
import RequestForm from "./components/request-form";
import { ConsentMock, ConversionMock, CookieMock } from "./components/mocks";

const checks: { t: string; mock?: React.ReactNode }[] = [
  { t: "Which conversions is Smart Bidding actually optimizing for, and which are duplicates, tests or leftovers?", mock: <ConversionMock /> },
  { t: "Are your lifecycle stages (MQL, SQL, opportunity, customer) set up as conversions, included in your goals, and firing?" },
  { t: "Is any stage sent more than once, through HubSpot, Data Manager or a Zapier automation?" },
  { t: "Do click IDs and hashed emails reach Google, so contacts can be matched to ad clicks?", mock: <CookieMock /> },
  { t: "Is anything still on legacy offline import, or routed through a manager account where HubSpot won't sync?" },
  { t: "Are consent signals set correctly for UK and EEA traffic?", mock: <ConsentMock /> },
  { t: "For the same period, do HubSpot's stage changes and Google Ads' conversions line up, and if not, why?" },
];

const notIncluded = [
  "Code changes on your website outside Tag Manager",
  "Redesigning lifecycle stages or lead scoring (we'll flag problems and quote separately)",
  "Campaign management, keywords or ad copy",
  "Salesforce as your CRM",
];

const included = [
  "A written report, with a screenshot for every finding",
  "A change log of everything we touched, with how to reverse each change",
  "A recorded screen walkthrough of the findings",
  "A 30-minute handover call",
];

const steps: [string, string][] = [
  ["Request a check.", "Tell us your website and Marketing Hub tier."],
  ["Fit call, 20 minutes.", "If it's not a fit, we'll say so on the call."],
  ["Kickoff.", "You pay 50% and grant access to Google Ads, HubSpot and Tag Manager."],
  ["Check and proposal.", "We run the check and send the proposed changes for your approval."],
  ["Fix and report.", "We make the approved changes and deliver the report within 7 business days of access, not counting time waiting for your approval. The second 50% is due on delivery."],
  ["Handover.", "A 30-minute call, then we remove our access."],
];

const faq = [
  { q: "Do I need Marketing Hub Professional?", a: "No. Marketing Hub Starter supports lifecycle stage conversion events too, up to 5 events." },
  { q: "Will this disrupt my campaigns?", a: "Changing primary conversions changes what Smart Bidding optimizes for. That's the point of the work, so we agree each change and its timing before we make it." },
  { q: "Will past leads be fixed too?", a: "HubSpot only syncs stage changes that happen after an event is created. Results count from handover forward." },
  { q: "Do you work with agencies?", a: "Yes. The report can be delivered unbranded so you can present it to your client." },
  { q: "What access do you need, and is it safe?", a: "Standard user access to Google Ads, HubSpot and Tag Manager. Every change is logged with how to reverse it, and we remove our access at handover." },
  { q: "Will you change our website?", a: "No. We work in Google Ads, HubSpot and Tag Manager settings. Code changes outside Tag Manager aren't included." },
  { q: "What happens after handover?", a: "Every change is documented in the change log, so your team can maintain it. If you'd like us to keep watching the connection, we'll explain the monthly plan on the handover call." },
];

const terms = [
  "$1,200, fixed.",
  "7 business days from access.",
  "Half now, half on delivery.",
  "Nothing changed without your approval.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.aftertheform.com/#organization",
      name: "After the Form",
      legalName: "Reubika LLC",
      url: "https://www.aftertheform.com",
      email: "hello@aftertheform.com",
      founder: {
        "@type": "Person",
        name: "Matt Strydom",
        sameAs: "https://www.linkedin.com/in/mattstrydom",
      },
    },
    {
      "@type": "Service",
      name: "After the Form check",
      provider: { "@id": "https://www.aftertheform.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "1200",
        priceCurrency: "USD",
      },
    },
  ],
};

const band = "py-20 sm:py-28";
const row = "border-b border-hairline last:border-0";

function Arcs() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 -z-10 h-full w-full fill-none stroke-hairline" strokeWidth="1.2">
      <path d="M-40 60 L980 270" />
      <path d="M1000 -40 C1180 140 1220 360 1180 760" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="relative isolate overflow-hidden">
          <Arcs />
          <div className="wrap pt-14 pb-8 sm:pt-20 sm:pb-20">
            <h1 className="max-w-[17ch] text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.08] tracking-[-0.045em]">
              Google Ads is learning from your form fills. <span className="accent">It should be learning from your pipeline.</span>
            </h1>
            <p className="mt-7 max-w-[56ch] text-xl text-ink">
              We fix the connection between HubSpot and Google Ads, so Smart Bidding can see which leads your sales team qualifies. Fixed price, fixed scope, done within 7 business days of access.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#request" className="btn">Request a check</a>
              <a href="/sample-report" className="btn btn-outline">See a sample report</a>
              <Link href="/teardown" className="link py-2 sm:px-2">Get a free teardown</Link>
            </div>
            <p className="mt-5 max-w-[56ch] font-medium">
              $1,200 fixed. If we find nothing to fix, you pay half and keep the report.
            </p>
            <p className="mt-4 max-w-[60rem] rounded-2xl border border-hairline bg-white/70 px-5 py-3 text-base">
              <span className="mr-3 border-r border-hairline pr-3 font-medium">Included in every check</span>
              A written report with a screenshot for every finding. A change log showing how to reverse every change. A recorded walkthrough. A 30-minute handover call.
            </p>
            <div className="mt-10 sm:mt-14">
              <HeroFlow />
            </div>
          </div>
        </section>

        <section className="pt-12 pb-20 sm:py-28">
          <div className="wrap">
            <h2 className="max-w-[20ch]">Smart Bidding can only learn from what you tell it</h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <div className="panel prose-col">
                <p>If your primary conversion is a form fill, Google Ads goes looking for more form fills. It can&apos;t see which of those leads your sales team qualified and which went nowhere.</p>
              </div>
              <div className="prose-col rounded-3xl bg-coral p-6 text-white sm:p-9">
                <p>The fix exists. HubSpot can send lifecycle stages to Google Ads as conversions, and Google Ads can pull them in through Data Manager. But a connection can sync for months without those stages ever being used for bidding. And when the numbers disagree, HubSpot&apos;s own documentation says they aren&apos;t expected to match Google&apos;s.</p>
              </div>
              <div className="on-dark prose-col rounded-3xl bg-deep p-6 text-white sm:p-9">
                <p>If your setup still uses offline conversion import, there&apos;s one more reason to look: Google now calls it a legacy method and recommends enhanced conversions for leads.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <h2 className="max-w-[20ch]">Seven questions we answer in every check</h2>
            <ul className="panel mt-12">
              {checks.map(({ t, mock }) => (
                <li key={t} className={`grid gap-4 py-5 first:pt-0 last:pb-0 lg:grid-cols-[1fr_22rem] lg:gap-12 ${row}`}>
                  <p className="max-w-[64ch]">{t}</p>
                  {mock}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap grid gap-5 lg:grid-cols-2">
            <div className="panel">
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">We fix it, with your sign-off</h2>
              <div className="prose-col mt-6">
                <p>Everything on the list that lives in Google Ads, HubSpot or Tag Manager settings. You see every proposed change before we make it. You also choose when bidding changes go live, because Smart Bidding relearns when primary conversions change.</p>
              </div>
            </div>
            <div className="panel">
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">Not included</h2>
              <ul className="mt-6">
                {notIncluded.map((t) => (
                  <li key={t} className={`py-3 first:pt-0 ${row}`}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <h2 className="max-w-[20ch]">See exactly what you&apos;ll get before you pay</h2>
            <div className="panel mt-12 grid gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="max-w-[44ch] text-xl">Our sample report is built on a fictional account, finding by finding: what we saw, why it matters, the change, and how to reverse it.</p>
                <a href="/sample-report" className="btn mt-6">Read the sample report</a>
              </div>
              <ul>
                {included.map((t) => (
                  <li key={t} className={`py-4 first:pt-0 last:pb-0 ${row}`}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="how" className={`on-dark bg-deep text-white ${band}`}>
          <div className="wrap">
            <h2>How it works</h2>
            <ol className="mt-12 max-w-[52rem]">
              {steps.map(([lead, rest], i) => (
                <li key={lead} className="grid grid-cols-[3.5rem_1fr] gap-2 border-t border-white/20 py-6 last:border-b">
                  <span className="text-3xl font-medium leading-none tracking-[-0.03em] text-mint">{i + 1}</span>
                  <p><span className="font-medium">{lead}</span> {rest}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="price" className={band}>
          <div className="wrap">
            <h2>One price. Two promises.</h2>
            <div className="mt-12 grid items-start gap-5 lg:grid-cols-2">
              <ul className="panel text-2xl font-medium tracking-[-0.03em]">
                {terms.map((t) => (
                  <li key={t} className={`py-4 first:pt-0 last:pb-0 ${row}`}>{t}</li>
                ))}
              </ul>
              <div className="prose-col rounded-3xl bg-paper-2 p-6 sm:p-9">
                <p>$1,200, fixed. Half when we start, half when the report is delivered. It covers everything on the check and fix lists. Anything outside them is quoted before any work starts.</p>
              </div>
            </div>
            <div className="on-dark mt-5 grid gap-5 text-white lg:grid-cols-2">
              <p className="rounded-3xl bg-deep p-6 text-2xl font-medium leading-snug tracking-[-0.03em] sm:p-9">
                If something on the fix list isn&apos;t working at handover, we keep going at no extra cost until it does.
              </p>
              <p className="rounded-3xl bg-deep p-6 text-2xl font-medium leading-snug tracking-[-0.03em] sm:p-9">
                If the check finds nothing that needs changing, you pay only the first half and keep the report confirming it.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <h2>Who it&apos;s for</h2>
            <div className="panel mt-12 space-y-5">
              <p className="max-w-[64ch]">Built for B2B companies that run Google Ads, use HubSpot Marketing Hub (Starter, Professional or Enterprise), and qualify leads after the form. Agencies can buy it for a client and deliver it under their own name.</p>
              <p className="max-w-[64ch] border-t border-hairline pt-5">Not a fit for e-commerce stores, teams on Salesforce, or accounts with no Google Ads spend.</p>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <div className="panel grid items-center gap-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14">
              <Image src="/matt.jpg" alt="Matt Strydom" width={512} height={512} className="aspect-square w-full rounded-3xl object-cover" />
              <div>
                <h2>Who you&apos;ll work with</h2>
                <div className="prose-col mt-6 text-xl">
                  <p>After the Form is led by Matt Strydom, who has spent seven years in RevOps and marketing operations at B2B SaaS companies. His day-to-day work is HubSpot, Google Ads conversion tracking and attribution: click ID capture, offline conversion pipelines and enhanced conversions.</p>
                  <p>The person on your fit call is the person working in your account. No handoffs.</p>
                  <p>Based in South Africa. Calls between 9am and 12pm US Eastern.</p>
                  <p><a href="https://www.linkedin.com/in/mattstrydom" className="link">Matt on LinkedIn</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" className="pb-20 sm:pb-28">
          <div className="wrap">
            <h2>Questions</h2>
            <div className="panel mt-12 !py-2 sm:!py-4">
              <Faq items={faq} />
            </div>
          </div>
        </section>

        <section id="request" className="pb-20 sm:pb-28">
          <div className="wrap">
            <div className="panel grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <h2>Request a check</h2>
              <div className="max-w-[36rem]">
                <RequestForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
