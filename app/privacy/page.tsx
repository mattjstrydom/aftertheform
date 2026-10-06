import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Privacy policy | After the Form",
  alternates: { canonical: "/privacy" },
};

const h = "mt-12 text-2xl tracking-[-0.02em]";

export default function Privacy() {
  return (
    <>
      <Header />
    <main className="wrap py-16">
      <div className="prose-col">
        <h1 className="text-4xl tracking-[-0.03em]">Privacy policy</h1>
        <p className="text-grey">Last updated 6 October 2026</p>

        <p>
          This policy explains what personal data aftertheform.com collects, why, who sees it and what
          your choices are. After the Form is run by Matt Strydom through Reubika LLC, USA (&quot;we&quot;,
          &quot;us&quot;). We are the controller of the data described here. Contact us at{" "}
          <a href="mailto:hello@aftertheform.com" className="link">hello@aftertheform.com</a>.
        </p>

        <h2 className={h}>What we collect</h2>
        <p>
          <strong>When you request a check.</strong> Your name, work email, company website, Marketing Hub
          tier and any note you choose to write. We use it to reply to you, to decide whether the service is
          a fit, and to prepare for a call if we have one.
        </p>
        <p>
          <strong>When you email us.</strong> Your email address and whatever you send.
        </p>
        <p>
          <strong>When you visit the site, and only if you accept cookies.</strong> Analytics and advertising
          measurement data, such as pages viewed, referrer, approximate location, device and browser
          details, and cookie identifiers. These are loaded through Google Tag Manager and are switched off
          until you press Accept.
        </p>
        <p>
          <strong>Technical logs.</strong> Our host records standard request data, such as IP address and
          user agent, to deliver the site and keep it secure. This happens whether or not you accept cookies.
        </p>
        <p>We do not ask for payment details on this site and we do not knowingly collect data from children.</p>

        <h2 className={h}>Why we use it, and our legal basis</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Replying to your request and taking steps you ask for before any agreement: legitimate interests, and steps at your request before entering a contract.</li>
          <li>Running a service you have bought, including access to your accounts: performance of a contract.</li>
          <li>Analytics and advertising measurement cookies: your consent, which you can withdraw at any time.</li>
          <li>Keeping the site secure and preventing spam: legitimate interests.</li>
          <li>Keeping records we are legally required to keep, such as invoices: legal obligation.</li>
        </ul>

        <h2 className={h}>Cookies and consent</h2>
        <p>
          Until you choose, every Google consent signal (<code>ad_storage</code>,{" "}
          <code>analytics_storage</code>, <code>ad_user_data</code> and <code>ad_personalization</code>) is
          set to denied. If you press Accept they are set to granted. If you press Decline they stay denied.
          We store your choice in your browser&apos;s local storage under the key <code>atf-consent</code> so
          we do not ask again. To change your mind, clear this site&apos;s data in your browser and the banner
          will return.
        </p>

        <h2 className={h}>Who we share it with</h2>
        <p>We do not sell your personal data. We use these providers to run the site and the service:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Vercel</strong>: hosts the site.</li>
          <li><strong>Sequenzy</strong>: stores your request and lets us email you about it.</li>
          <li><strong>Google (Tag Manager and any tags loaded through it)</strong>: analytics and advertising measurement, only after you accept.</li>
        </ul>
        <p>
          If you become a client, you will give us access to your Google Ads, HubSpot and Tag Manager
          accounts. We use that access only to perform the work, we record every change in the change log,
          and we remove our access at handover. We may also disclose data where the law requires it.
        </p>

        <h2 className={h}>International transfers</h2>
        <p>
          We work from South Africa and our company is based in the United States, and our providers
          process data in the United States and elsewhere. Where data about people in the UK or EEA is
          transferred to a country without an adequacy decision, we rely on safeguards such as the standard
          contractual clauses our providers offer.
        </p>

        <h2 className={h}>How long we keep it</h2>
        <p>
          Requests that do not lead to an engagement are deleted within 24 months. If you become a client we
          keep the work records for the length of the engagement and then for as long as tax and accounting
          rules require. Analytics data follows the retention settings of the analytics tool and is not
          collected at all if you decline cookies. You can ask us to delete your data sooner.
        </p>

        <h2 className={h}>Your rights</h2>
        <p>
          Depending on where you live (including the UK, EEA, California and South Africa) you may have the
          right to access your data, correct it, delete it, restrict or object to its use, receive a copy in
          a portable format, withdraw consent, and not be discriminated against for using these rights.
          Email{" "}
          <a href="mailto:hello@aftertheform.com" className="link">hello@aftertheform.com</a> and we will
          respond within one month. You can also complain to your local data protection authority.
        </p>
        <p>We do not sell or share personal information for cross-context behavioural advertising as those terms are defined in California law.</p>

        <h2 className={h}>Security</h2>
        <p>
          The site is served over HTTPS. Access to the systems that hold your data is limited to the people
          who need it and protected by their own sign-in controls. No system is perfectly secure, and we
          will tell you and the relevant authority where the law requires us to if there is a breach that
          affects you.
        </p>

        <h2 className={h}>Changes to this policy</h2>
        <p>When we change this policy we will update the date at the top. If a change is significant we will make that clear on the site.</p>

        <p className="mt-12">
          <Link href="/" className="link">Back to After the Form</Link>
        </p>
      </div>
    </main>
      <Footer />
    </>
  );
}
