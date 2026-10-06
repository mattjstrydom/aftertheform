import Image from "next/image";
import HeroFlow from "./hero-flow";
import Header from "./components/header";
import Footer from "./components/footer";
import Faq from "./components/faq";
import RequestForm from "./components/request-form";
import { ConsentMock, ConversionMock, CookieMock } from "./components/mocks";

const checks: { t: string; mock?: React.ReactNode }[] = [
  { t: "Which conversion actions are primary and used for bidding, and which are duplicates, tests or leftovers", mock: <ConversionMock /> },
  { t: "Whether your lifecycle stages (MQL, SQL, opportunity, customer) are set up as Google Ads conversion events, included in account-level goals, and firing" },
  { t: "Whether the same stage is sent more than once, through HubSpot, Google's Data Manager or a Zapier automation" },
  { t: "Whether click IDs and hashed email reach Google, so HubSpot contacts can be matched to ad clicks", mock: <CookieMock /> },
  { t: "Whether any events still use legacy offline conversion import, or send form data through a manager account, where HubSpot says it won't sync" },
  { t: "Consent settings for UK and EEA traffic, if you advertise there", mock: <ConsentMock /> },
  { t: "A side-by-side count for the same period: stage changes in HubSpot from Google Ads contacts, and conversions Google Ads recorded" },
];

const notIncluded = [
  "Code changes on your website outside Tag Manager",
  "Redesigning lifecycle stages or lead scoring (We'll flag problems and quote separately)",
  "Campaign management, keywords or ad copy",
  "Salesforce as your CRM",
];

const steps: [string, string][] = [
  ["Request the check.", "Tell us your website and Marketing Hub tier."],
  ["We have a 20-minute call", "to confirm it's a fit. If it isn't, we'll tell you on the call."],
  ["You pay 50%", "and give us access to Google Ads, HubSpot and Tag Manager."],
  ["We run the check", "and send you the proposed changes to approve."],
  ["We make the approved changes", "and send the report within 15 business days of access, not counting time waiting for your approval. The remaining 50% is due when the report is delivered."],
  ["We do the handover call,", "and remove our access."],
];

const faq = [
  { q: "Do I need Marketing Hub Professional?", a: "No. Marketing Hub Starter supports lifecycle stage conversion events too, up to 5 events." },
  { q: "Will this disrupt my campaigns?", a: "Changing primary conversions changes what Smart Bidding optimizes for. That's the point of the work, so we agree each change and its timing before we make it." },
  { q: "Will past leads be fixed too?", a: "HubSpot only syncs stage changes that happen after an event is created. Results count from handover forward." },
  { q: "Do you work with agencies?", a: "Yes. The report can be delivered unbranded so you can present it to your client." },
];

const terms = [
  "$1,200, fixed",
  "15 business days from access",
  "Half now, half on delivery",
  "Nothing changed without your approval",
];

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
      <Header />
      <main>
        <section className="relative isolate overflow-hidden">
          <Arcs />
          <div className="wrap pt-14 pb-20 sm:pt-20">
            <h1 className="max-w-[17ch] text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.08] tracking-[-0.045em]">
              Make sure Google Ads learns from <span className="accent">the leads your sales team qualifies.</span>
            </h1>
            <p className="mt-7 max-w-[56ch] text-xl text-ink">
              A fixed-price check and fix of the connection between HubSpot and Google Ads. $1,200.
              Delivered within 15 business days of access. We do the work ourselves, start to finish.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#request" className="btn">Request a check</a>
              <a href="/sample-report" className="btn btn-outline">See a sample report</a>
            </div>
            <div className="mt-14">
              <HeroFlow />
            </div>
          </div>
        </section>

        <section className={band}>
          <div className="wrap">
            <h2>The problem</h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <div className="panel prose-col">
                <p>Google Ads bids toward the conversions you mark as primary. If your primary conversion is a form fill, Smart Bidding goes looking for more form fills. It can&apos;t tell which of those leads your sales team later qualified.</p>
              </div>
              <div className="prose-col rounded-3xl bg-coral p-6 text-white sm:p-9">
                <p>HubSpot and Google can pass those later stages back. HubSpot can send lifecycle stage changes to Google Ads as conversion events, and Google Ads can pull them in through Data Manager. Either route can be connected and syncing while those stages aren&apos;t used for bidding. When the counts disagree, HubSpot&apos;s own documentation says they aren&apos;t expected to match Google&apos;s, and its support team can&apos;t pull sync logs unless there&apos;s an error.</p>
              </div>
              <div className="on-dark prose-col rounded-3xl bg-deep p-6 text-white sm:p-9">
                <p>Google now calls offline conversion import a legacy method and recommends enhanced conversions for leads. If your setup is older than that change, it&apos;s worth a look.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <h2>What we check</h2>
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
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">What we fix</h2>
              <div className="prose-col mt-6">
                <p>Anything on the check list that lives in Google Ads, HubSpot or Google Tag Manager settings. We send you the list of proposed changes first, and make only the ones you approve. Changing primary conversions changes what Smart Bidding optimizes for, so you decide the timing.</p>
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
            <h2>What you get</h2>
            <ul className="panel mt-12">
              <li className={`pb-6 ${row}`}>
                <p className="text-3xl font-medium tracking-[-0.03em]">A written After the Form report</p>
                <a href="/sample-report" className="link mt-2 inline-block text-xl font-medium">See a sample report</a>
              </li>
              {["A change log of everything we touched, with how to reverse each change", "A recorded screen walkthrough of the findings", "A 30-minute handover call"].map((t) => (
                <li key={t} className={`py-4 last:pb-0 ${row}`}>{t}</li>
              ))}
            </ul>
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
            <h2>Price</h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <ul className="panel text-2xl font-medium tracking-[-0.03em]">
                {terms.map((t) => (
                  <li key={t} className={`py-4 first:pt-0 last:pb-0 ${row}`}>{t}</li>
                ))}
              </ul>
              <div className="prose-col rounded-3xl bg-paper-2 p-6 sm:p-9">
                <p>$1,200, fixed: half when we start, half when the report is delivered. It covers everything on the check and fix lists above. Anything outside them is quoted before any work starts.</p>
                <p>If something on the fix list isn&apos;t working at handover, we keep going at no extra cost until it does.</p>
                <p>If the check finds nothing that needs changing, you get the written report confirming it and pay only the first half. Every finding in the report comes with a screenshot, so you can see what we saw.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <h2>Who it&apos;s for</h2>
            <div className="panel mt-12 space-y-5">
              <p className="max-w-[64ch]">B2B companies that run Google Ads, use HubSpot Marketing Hub Starter, Professional or Enterprise, and qualify leads after the form. Agencies can buy it for a client and deliver it under their own name.</p>
              <p className="max-w-[64ch] border-t border-hairline pt-5">It&apos;s a poor fit for e-commerce stores, teams on Salesforce, and accounts with no Google Ads spend.</p>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="wrap">
            <div className="panel grid items-center gap-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14">
              <Image src="/matt.jpg" alt="Matt Strydom" width={512} height={512} className="aspect-square w-full rounded-3xl object-cover" />
              <div>
                <h2>Who does the work</h2>
                <div className="prose-col mt-6 text-xl">
                  <p>We&apos;re After the Form, run by Matt Strydom. Matt has spent 7 years in RevOps and marketing operations at B2B SaaS companies. Our day-to-day work is HubSpot, Google Ads conversion tracking and attribution, including click ID capture, offline conversion pipelines and enhanced conversions. Matt built a HubSpot sync.</p>
                  <p>We&apos;re based in South Africa. Calls happen between 9am and 12pm US Eastern.</p>
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
