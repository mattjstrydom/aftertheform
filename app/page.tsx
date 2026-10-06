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

const band = "py-16 sm:py-24";
const split = "grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="wrap pt-12 pb-16 sm:pt-16">
          <h1 className="max-w-[22ch] text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.035em]">
            Make sure Google Ads learns from the leads your sales team qualifies.
          </h1>
          <p className="mt-6 max-w-[62ch] text-grey">
            A fixed-price check and fix of the connection between HubSpot and Google Ads. $1,200.
            Delivered within 15 business days of access. We do the work ourselves, start to finish.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#request" className="btn">Request a check</a>
            <a href="/sample-report" className="link">See a sample report</a>
          </div>
          <div className="mt-10">
            <HeroFlow />
          </div>
        </section>

        <section className={`${band} bg-paper-2`}>
          <div className={`wrap ${split}`}>
            <h2>The problem</h2>
            <div className="prose-col">
              <p>Google Ads bids toward the conversions you mark as primary. If your primary conversion is a form fill, Smart Bidding goes looking for more form fills. It can&apos;t tell which of those leads your sales team later qualified.</p>
              <p>HubSpot and Google can pass those later stages back. HubSpot can send lifecycle stage changes to Google Ads as conversion events, and Google Ads can pull them in through Data Manager. Either route can be connected and syncing while those stages aren&apos;t used for bidding. When the counts disagree, HubSpot&apos;s own documentation says they aren&apos;t expected to match Google&apos;s, and its support team can&apos;t pull sync logs unless there&apos;s an error.</p>
              <p>Google now calls offline conversion import a legacy method and recommends enhanced conversions for leads. If your setup is older than that change, it&apos;s worth a look.</p>
            </div>
          </div>
        </section>

        <section className={band}>
          <div className="wrap">
            <h2>What we check</h2>
            <ul className="mt-10 border-t border-hairline">
              {checks.map(({ t, mock }) => (
                <li key={t} className="grid gap-4 border-b border-hairline py-5 lg:grid-cols-[1fr_22rem] lg:gap-12">
                  <p className="max-w-[64ch]">{t}</p>
                  {mock}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${band} bg-paper-2`}>
          <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-12">
              <h2>What we fix</h2>
              <div className="prose-col mt-6">
                <p>Anything on the check list that lives in Google Ads, HubSpot or Google Tag Manager settings. We send you the list of proposed changes first, and make only the ones you approve. Changing primary conversions changes what Smart Bidding optimizes for, so you decide the timing.</p>
              </div>
            </div>
            <div className="lg:border-l lg:border-hairline lg:pl-12">
              <h2>Not included</h2>
              <ul className="mt-6 border-t border-hairline">
                {notIncluded.map((t) => (
                  <li key={t} className="border-b border-hairline py-3">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={band}>
          <div className={`wrap ${split}`}>
            <h2>What you get</h2>
            <ul className="border-t border-hairline">
              <li className="border-b border-hairline py-6">
                <p className="text-2xl font-medium tracking-[-0.015em]">A written After the Form report</p>
                <a href="/sample-report" className="link mt-2 inline-block text-xl font-medium">See a sample report</a>
              </li>
              {["A change log of everything we touched, with how to reverse each change", "A recorded screen walkthrough of the findings", "A 30-minute handover call"].map((t) => (
                <li key={t} className="border-b border-hairline py-4">{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className={`${band} bg-paper-2`}>
          <div className={`wrap ${split}`}>
            <h2>How it works</h2>
            <ol className="max-w-[48rem]">
              {steps.map(([lead, rest], i) => (
                <li key={lead} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-hairline py-5 last:border-b">
                  <span className="text-3xl font-medium leading-none tracking-[-0.02em] text-grey">{i + 1}</span>
                  <p><span className="font-medium">{lead}</span> {rest}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="price" className={band}>
          <div className={`wrap ${split}`}>
            <h2>Price</h2>
            <div>
              <ul className="max-w-[40rem] border-t border-hairline text-2xl font-medium tracking-[-0.015em]">
                {terms.map((t) => (
                  <li key={t} className="border-b border-hairline py-3">{t}</li>
                ))}
              </ul>
              <div className="prose-col mt-10">
                <p>$1,200, fixed: half when we start, half when the report is delivered. It covers everything on the check and fix lists above. Anything outside them is quoted before any work starts.</p>
                <p>If something on the fix list isn&apos;t working at handover, we keep going at no extra cost until it does.</p>
                <p>If the check finds nothing that needs changing, you get the written report confirming it and pay only the first half. Every finding in the report comes with a screenshot, so you can see what we saw.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${band} bg-paper-2`}>
          <div className={`wrap ${split}`}>
            <h2>Who it&apos;s for</h2>
            <div className="prose-col">
              <p>B2B companies that run Google Ads, use HubSpot Marketing Hub Starter, Professional or Enterprise, and qualify leads after the form. Agencies can buy it for a client and deliver it under their own name.</p>
              <p className="border-t border-hairline pt-5">It&apos;s a poor fit for e-commerce stores, teams on Salesforce, and accounts with no Google Ads spend.</p>
            </div>
          </div>
        </section>

        <section className={band}>
          <div className="wrap grid gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16">
            <div>
              <Image src="/matt.jpg" alt="Matt Strydom" width={512} height={512} className="aspect-square w-full rounded-[10px] object-cover" />
            </div>
            <div>
              <h2>Who does the work</h2>
              <div className="prose-col mt-6 text-xl">
                <p>We&apos;re After the Form, run by Matt Strydom. Matt has spent 7 years in RevOps and marketing operations at B2B SaaS companies. Our day-to-day work is HubSpot, Google Ads conversion tracking and attribution, including click ID capture, offline conversion pipelines and enhanced conversions. Matt built a HubSpot sync.</p>
                <p>We&apos;re based in South Africa. Calls happen between 9am and 12pm US Eastern.</p>
                <p><a href="https://www.linkedin.com/in/mattstrydom" className="link">Matt on LinkedIn</a></p>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" className={`${band} bg-paper-2`}>
          <div className={`wrap ${split}`}>
            <h2>Questions</h2>
            <Faq items={faq} />
          </div>
        </section>

        <section id="request" className={band}>
          <div className={`wrap ${split}`}>
            <h2>Request a check</h2>
            <div className="max-w-[36rem]">
              <RequestForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
