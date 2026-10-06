import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import RequestForm from "../components/request-form";

export const metadata: Metadata = {
  title: "Free teardown | After the Form",
  alternates: { canonical: "/teardown" },
  openGraph: { title: "Free teardown | After the Form", url: "/teardown", type: "website", images: ["/opengraph-image"] },
};

const looks = [
  "whether the Google tag and Tag Manager load",
  "whether click IDs from your ads get stored",
  "whether HubSpot's tracking code is on the page",
  "how consent is set up for UK and EEA visitors",
];

export default function Teardown() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="wrap pt-14 pb-12 sm:pt-20">
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.045em]">
            See what Google can see on your landing page
          </h1>
          <div className="mt-8 max-w-[62ch] space-y-5 text-xl">
            <p>
              Send us the page your ads point to. We&apos;ll record a five-minute look at what&apos;s visible from
              outside, the way any visitor&apos;s browser sees it:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              {looks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>
              No access, no call. We only look at what your page shows any visitor. We do a limited number each
              week.
            </p>
          </div>
        </section>

        <section className="wrap pb-20 sm:pb-28">
          <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="prose-col rounded-3xl bg-paper-2 p-6 sm:p-9">
              <p>
                What a teardown can&apos;t show: which conversions you bid on, whether your lifecycle stages reach
                Google Ads, and how the counts compare. That&apos;s what the full check covers.
              </p>
            </div>
            <div className="panel">
              <div className="max-w-[36rem]">
                <RequestForm type="teardown" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
