import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { Slot } from "../components/ph";
import { site } from "../site.config";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Terms of service",
  description:
    "Terms for the After the Form check and fix, the agency pilot and the monthly plan: prices, payment, scope, the fix cap, refunds, access and liability.",
  path: "/terms",
});

const h2 = "pt-8 text-title-s scroll-mt-24";
const list = "list-disc space-y-2 pl-6";

function C({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium">{n}</span> {children}
    </p>
  );
}

export default function Terms() {
  return (
    <>
      <Header path="/terms" />
      <main id="main" tabIndex={-1} className="container-site pb-20 pt-12 sm:pt-16">
        <article className="max-w-[64ch] space-y-5 text-text-l">
          <h1 className="text-title-l">Terms of service</h1>
          <p className="text-gray-600">
            Last updated <Slot value={site.termsLastUpdated} />
          </p>

          <h2 id="clause-1" className={h2}>1. Who we are</h2>
          <C n="1.1">
            &quot;We&quot; and &quot;us&quot; means Reubika LLC, a New Mexico limited liability company, trading as After the Form. &quot;You&quot; means the business that buys from us. That can be an agency buying for one of its clients, or a company buying for itself.
          </C>
          <C n="1.2">These terms apply to the check and fix (including the agency pilot) and to the monthly plan. They also apply to any extra work we quote in writing.</C>

          <h2 id="clause-2" className={h2}>2. Prices and payment</h2>
          <C n="2.1">All prices are in US dollars and paid through Stripe.</C>
          <C n="2.2">
            <strong className="font-medium">Check and fix:</strong> $1,200. <strong className="font-medium">Agency pilot:</strong> $900 if you agree to a short case study and a 20-minute debrief, or $1,200 without.
          </C>
          <C n="2.3">You pay 50% at kickoff and 50% on delivery of the report. Both are by Stripe invoice, due on receipt.</C>
          <C n="2.4">
            <strong className="font-medium">Monthly plan:</strong> $1,500 a month for up to 3 client accounts, $2,500 a month for up to 5, and $400 a month for each extra account. It&apos;s billed monthly in advance by Stripe subscription.
          </C>
          <C n="2.5">
            <strong className="font-medium">Extra work:</strong> ops work outside the monthly plan (for example routing, clean-up, reporting or new builds) is sold in blocks at $150 an hour, with a 5-hour minimum. We agree it in writing before we start.
          </C>
          <C n="2.6">If you join the monthly plan within 14 days of the day 30 recheck, we credit the pilot fee against your first month.</C>

          <h2 id="clause-3" className={h2}>3. What the check and fix includes</h2>
          <C n="3.1">One HubSpot portal and one individual Google Ads account (not a manager account).</C>
          <C n="3.2">Seven checks, and fixes to the items we find in HubSpot, Google Ads and Tag Manager settings.</C>
          <C n="3.3">A report with a screenshot for every finding, a change log with steps to undo each change, a recorded walkthrough and a 30-minute handover call.</C>
          <C n="3.4">Delivery within 7 business days of receiving the access we need, not counting time spent waiting for your approval.</C>
          <C n="3.5">A free recheck at day 30.</C>
          <C n="3.6">We don&apos;t make any change without your approval.</C>
          <C n="3.7">
            <strong className="font-medium">Not included:</strong> website code outside Tag Manager, redesign of lifecycle stages or lead scoring, campaign management, Salesforce, and syncs run from a manager account.
          </C>

          <h2 id="clause-4" className={h2}>4. If we find nothing to change</h2>
          <p>If none of the seven checks finds anything that needs changing, the kickoff payment is the full fee. We never invoice the second half, and you keep the report.</p>

          <h2 id="clause-5" className={h2}>5. The fix cap (&quot;we keep going, within limits&quot;)</h2>
          <C n="5.1">A conversion action on the fix list is <strong className="font-medium">working</strong> when all four of these are true:</C>
          <ol className="list-none space-y-2 pl-6">
            <li>(a) HubSpot&apos;s sync status shows no error for it;</li>
            <li>(b) Google Ads conversion diagnostics show it as active, with no error;</li>
            <li>(c) it&apos;s set as Primary or Secondary, as agreed in the report; and</li>
            <li>(d) a test contact we move through that stage is recorded.</li>
          </ol>
          <C n="5.2">Working doesn&apos;t mean the HubSpot and Google Ads counts match. HubSpot&apos;s own documentation says the totals may not match.</C>
          <C n="5.3">If an item on the fix list isn&apos;t working at handover, we put in up to 10 extra hours within 30 days of handover, at no extra cost.</C>
          <C n="5.4">If an in-scope item still isn&apos;t working when we reach that cap, we refund the second payment.</C>
          <C n="5.5">The fix cap doesn&apos;t cover:</C>
          <ul className={list}>
            <li>causes outside our scope, such as website code outside Tag Manager;</li>
            <li>changes made by you, your agency or your client after handover;</li>
            <li>Google or HubSpot outages; or</li>
            <li>low lead volume.</li>
          </ul>

          <h2 id="clause-6" className={h2}>6. Monthly plan</h2>
          <C n="6.1">The monthly plan is a monitored-accounts plan, not a bank of hours.</C>
          <C n="6.2">Each month, on each account, we:</C>
          <ul className={list}>
            <li>run monthly checks of the HubSpot to Google Ads connection (sync errors, the count gap, click ID coverage, changes to Primary conversions, and consent);</li>
            <li>send a white-label monthly note; and</li>
            <li>fix anything that breaks, up to 1.5 hours per account.</li>
          </ul>
          <C n="6.3">Other work is quoted separately under clause 2.5.</C>
          <C n="6.4">There&apos;s a 3-month minimum. After that, the plan runs month to month until either of us gives 30 days&apos; written notice.</C>

          <h2 id="clause-7" className={h2}>7. Refunds</h2>
          <C n="7.1">The kickoff payment is refundable in full only if we can&apos;t start within 5 business days of receiving access. Once work starts, it&apos;s non-refundable, except under clause 5.4.</C>
          <C n="7.2">There are no refunds for part months on the monthly plan.</C>

          <h2 id="clause-8" className={h2}>8. Your responsibilities</h2>
          <C n="8.1">You&apos;re responsible for having a lawful basis, consent and privacy notices for the contact data that is synced to Google.</C>
          <C n="8.2">
            You keep the access we need in place while the work is under way. Delays caused by missing access or late approvals pause the delivery clock and the 30-day fix cap clock in clause 5.3. If the access we need is still missing 30 days after kickoff, either of us can end the work by email, and we refund the kickoff payment less any time already spent at $150 an hour.
          </C>

          <h2 id="clause-9" className={h2}>9. Access and data</h2>
          <C n="9.1">We ask only for the access the work needs, through named user invites. We never use shared passwords, and our accounts use two-step login.</C>
          <C n="9.2">You can revoke our access at any time. We remove our access at handover unless you&apos;re on the monthly plan.</C>
          <C n="9.3">We don&apos;t export or copy contact records. Screenshots blur personal data.</C>
          <C n="9.4">We delete working files within 30 days of the work ending.</C>
          <C n="9.5">For personal data in your accounts, we act only on your instructions, as a processor.</C>
          <C n="9.6">
            <Slot value={site.dpaPosition} />
          </C>

          <h2 id="clause-10" className={h2}>10. White-label work for agencies</h2>
          <C n="10.1">We never contact your client unless you invite us.</C>
          <C n="10.2">Our name appears nowhere in the deliverables.</C>
          <C n="10.3">We don&apos;t publicise the work without your written consent.</C>
          <C n="10.4">A case study only applies when you take the pilot discount, and it uses wording you approve.</C>
          <C n="10.5">
            For 12 months after our last work for you, we won&apos;t sell directly to the clients we worked on through you, unless you agree in writing. If one of those clients contacts us directly, we refer them back to you.
          </C>

          <h2 id="clause-11" className={h2}>11. Liability</h2>
          <C n="11.1">Our total liability is capped. For a check and fix or pilot, the cap is the fees you paid for it. For the monthly plan, it&apos;s the fees you paid in the last 3 months.</C>
          <C n="11.2">We&apos;re not liable for ad spend, bidding results, lost revenue, or any indirect or consequential loss.</C>
          <C n="11.3">We don&apos;t guarantee ad performance. Smart Bidding decisions are Google&apos;s.</C>
          <C n="11.4">Google and HubSpot change their products, features and documentation, and that&apos;s outside our control.</C>

          <h2 id="clause-12" className={h2}>12. Governing law and venue</h2>
          {site.governingLaw.map((t, i) => (
            <C key={i} n={`12.${i + 1}`}>
              {t}
            </C>
          ))}

          <h2 id="clause-13" className={h2}>13. Changes to these terms</h2>
          <p>
            We may update these terms. A check and fix or pilot stays under the version in force when you paid the kickoff invoice. For the monthly plan, we give at least 30 days&apos; notice by email before a change applies, and you can cancel before it takes effect without the 30-day notice in clause 6.4 (the 3-month minimum still applies).
          </p>
          {site.terms13Pending && (
            <p>
              <Slot value={site.terms13Pending} />
            </p>
          )}

          <h2 id="contact" className={h2}>Contact</h2>
          <p>
            <a href={`mailto:${site.email}`} className="link">{site.email}</a>
          </p>

          <p className="pt-8">
            <Link href="/" className="link">Back to After the Form</Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
