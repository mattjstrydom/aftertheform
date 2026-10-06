import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import { ConsentMock, ConversionMock, CookieMock } from "../components/mocks";

export const metadata: Metadata = {
  title: "Sample report | After the Form",
  description: "An example After the Form report, built on a fictional account.",
  alternates: { canonical: "/sample-report" },
};

const findings: { t: string; saw: string; why: string; change: string; undo: string; evidence?: React.ReactNode }[] = [
  {
    t: "Qualified stages are imported but not used for bidding",
    saw: "“Lead form submit” is the only Primary conversion action. “HubSpot MQL” and “HubSpot SQL” are syncing, but they are set to Secondary and sit outside the account-level goal.",
    why: "Smart Bidding optimizes toward Primary actions in the goal. With form fills as the only Primary action, it looks for more form fills and cannot tell which leads sales later qualified.",
    change: "Set “HubSpot SQL” to Primary and include it in the account-level goal. Move “Lead form submit” to Secondary. You decide the date, because bidding will relearn.",
    undo: "Set “Lead form submit” back to Primary and “HubSpot SQL” back to Secondary.",
    evidence: <ConversionMock />,
  },
  {
    t: "The same stage is sent twice",
    saw: "“HubSpot SQL” reaches Google Ads through the HubSpot integration and through a Zapier automation that fires on the same lifecycle stage change.",
    why: "Google Ads counts both. SQL conversions read about twice as high as the stage changes recorded in HubSpot, which inflates the value Smart Bidding assigns to those clicks.",
    change: "Pause the Zapier automation and keep the HubSpot integration.",
    undo: "Turn the Zapier automation back on.",
  },
  {
    t: "Click IDs are on the page but not reaching HubSpot",
    saw: "The _gcl_aw cookie is set after an ad click, but the hidden click ID field on the demo form is empty on submit.",
    why: "Without the click ID, HubSpot cannot match the contact to the ad click, so later stages cannot be attributed to the campaign that produced them.",
    change: "Add a Tag Manager tag that reads the cookie and fills the hidden field before the form is submitted. This stays inside Tag Manager, so no website code changes.",
    undo: "Pause or delete the new tag. The form keeps working without it.",
    evidence: <CookieMock />,
  },
  {
    t: "Customer conversions still use legacy offline import",
    saw: "“Customer” is uploaded from a weekly CSV through offline conversion import. No customer conversions were recorded in Google Ads in the period.",
    why: "Google calls offline conversion import a legacy method and recommends enhanced conversions for leads. The weekly upload also arrives late and is easy to miss.",
    change: "Send the Customer stage through the HubSpot integration and retire the CSV upload once the first conversions appear.",
    undo: "Re-enable the CSV upload. Nothing is deleted.",
  },
  {
    t: "Consent defaults load after the Google tags",
    saw: "On pages served to UK and EEA visitors, the consent defaults are set after the first Google tag fires, and ad_user_data is not set at all.",
    why: "Consent signals have to be in place before any Google tag loads, or the tags run without them.",
    change: "Add a consent default tag that fires first and sets all four signals to denied until the visitor accepts.",
    undo: "Pause the consent default tag.",
    evidence: <ConsentMock />,
  },
  {
    t: "A test conversion is counted as a goal",
    saw: "“Test conversion” is a Primary action and is included in the account-level goal.",
    why: "It is a leftover from setup. Any traffic that triggers it adds noise to what bidding learns from.",
    change: "Remove it from the goal and set it to Secondary.",
    undo: "Set it back to Primary and add it to the goal.",
  },
];

const counts: [string, string, string][] = [
  ["MQL", "142", "131"],
  ["SQL", "61", "118"],
  ["Opportunity", "24", "22"],
  ["Customer", "9", "0"],
];

const changeLog: [string, string][] = [
  ["Set “HubSpot SQL” to Primary; “Lead form submit” to Secondary", "Approved, scheduled"],
  ["Pause the Zapier automation", "Approved, done"],
  ["Tag Manager tag to fill the hidden click ID field", "Approved, done"],
  ["Move Customer to the HubSpot integration; retire CSV upload", "Approved, waiting on first conversions"],
  ["Consent default tag in Tag Manager", "Approved, done"],
  ["Remove “Test conversion” from the goal", "Approved, done"],
];

const h2 = "text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.02em]";

export default function SampleReport() {
  return (
    <>
      <Header />
    <main>
      <section className="wrap pt-12 pb-10 sm:pt-16">
        <p className="text-grey">After the Form report</p>
        <h1 className="mt-2 max-w-[18ch] text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.04] tracking-[-0.03em]">
          Sample report
        </h1>
        <p className="mt-6 max-w-[62ch]">
          This is an example of what you receive, built on a fictional account. The company, the figures
          and the screenshots are illustrative. They are not a client result.
        </p>
        <dl className="mt-8 grid max-w-[40rem] grid-cols-[auto_1fr] gap-x-8 gap-y-1 border-t border-hairline pt-4">
          <dt className="text-grey">Account</dt>
          <dd>Example Co (fictional), B2B software</dd>
          <dt className="text-grey">Stack</dt>
          <dd>HubSpot Marketing Hub Professional, Google Ads, Google Tag Manager</dd>
          <dt className="text-grey">Period compared</dt>
          <dd>The last 30 days</dd>
        </dl>
      </section>

      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 className={h2}>Summary</h2>
          <div className="prose-col">
            <p>
              Google Ads is bidding on form fills. The qualified stages exist in the account, but they are
              Secondary, one of them is sent twice, and Customer arrives through a legacy upload that records
              nothing. Click IDs are not reaching HubSpot, so later stages cannot be tied back to ad clicks.
            </p>
            <p>
              Six changes are proposed. All of them live in Google Ads, HubSpot or Tag Manager settings. None
              touches the website outside Tag Manager.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="wrap">
          <h2 className={h2}>Findings</h2>
          <p className="mt-3 max-w-[62ch] text-grey">
            Each finding comes with what we saw, why it matters, the change we propose and how to reverse it.
            In a real report every finding also has a screenshot.
          </p>
          <ul className="mt-10 border-t border-hairline">
            {findings.map((f) => (
              <li key={f.t} className="grid gap-6 border-b border-hairline py-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
                <div className="prose-col">
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">{f.t}</h3>
                  <p><span className="font-medium">What we saw.</span> {f.saw}</p>
                  <p><span className="font-medium">Why it matters.</span> {f.why}</p>
                  <p><span className="font-medium">Proposed change.</span> {f.change}</p>
                  <p><span className="font-medium">To reverse.</span> {f.undo}</p>
                </div>
                <div>{f.evidence}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <h2 className={h2}>Side-by-side count</h2>
            <p className="mt-3 max-w-[36ch] text-grey">Same 30 days. Example data.</p>
          </div>
          <div>
            <table className="w-full max-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Stage changes in HubSpot against conversions recorded in Google Ads</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th className="py-2 pr-4 font-medium">Stage</th>
                  <th className="py-2 pr-4 text-right font-medium">HubSpot, from Google Ads contacts</th>
                  <th className="py-2 text-right font-medium">Google Ads recorded</th>
                </tr>
              </thead>
              <tbody>
                {counts.map(([s, a, b]) => (
                  <tr key={s} className="border-b border-hairline">
                    <td className="py-3 pr-4">{s}</td>
                    <td className="py-3 pr-4 text-right">{a}</td>
                    <td className="py-3 text-right">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="prose-col mt-6">
              <p>
                HubSpot says the two counts are not expected to match, so differences alone are not a fault.
                These ones are explained. SQL in Google Ads is about double because it is sent twice.
                Customer is zero because the legacy upload is not recording. MQL and Opportunity are close.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 className={h2}>Change log</h2>
          <div>
            <p className="max-w-[62ch] text-grey">
              We send the proposed changes first and make only the ones you approve. This log lists what we
              touched. Each change has its reversal in the findings above.
            </p>
            <table className="mt-6 w-full max-w-[44rem] border-collapse text-left">
              <caption className="sr-only">Changes made, with status</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th className="py-2 pr-4 font-medium">Change</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {changeLog.map(([c, s]) => (
                  <tr key={c} className="border-b border-hairline align-top">
                    <td className="py-3 pr-4">{c}</td>
                    <td className="py-3 text-grey">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-14 sm:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 className={h2}>Handover</h2>
          <div className="prose-col">
            <p>
              The report comes with a recorded screen walkthrough of the findings and a 30-minute handover
              call. If something on the fix list is not working at handover, we keep going until it does.
            </p>
            <p>
              HubSpot only syncs stage changes that happen after an event is created, so results count from
              handover forward.
            </p>
            <p className="mt-8">
              <Link href="/#request" className="btn">Request a check</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
