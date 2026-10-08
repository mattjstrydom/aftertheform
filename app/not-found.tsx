import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import { CalButton, SampleButton } from "./components/cta";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header path="/404" />
      <main id="main" tabIndex={-1}>
        <section aria-labelledby="nf-title" className="section-y">
          <div className="container-site">
            <h1 id="nf-title" className="text-title-l max-w-[20ch]">We can&apos;t find that page</h1>
            <p className="mt-6 max-w-[33.75rem] text-text-l">The link may be old, or the page may have moved.</p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <CalButton className="w-full sm:w-auto" />
              <SampleButton className="w-full sm:w-auto" />
            </div>
            <p className="mt-8">
              <Link href="/" className="link">Go to the home page</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
