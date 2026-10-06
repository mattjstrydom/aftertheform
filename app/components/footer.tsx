import Link from "next/link";
import CookieSettings from "./cookie-settings";

export default function Footer() {
  return (
    <footer className="on-dark bg-deep py-10 text-base text-[#bec9c6]">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p>After the Form is a service of Reubika LLC, USA, led by Matt Strydom.</p>
        <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="link">Privacy policy</Link>
          <CookieSettings />
          <Link href="/teardown" className="link">Get a free teardown</Link>
          <span>© {new Date().getFullYear()} Reubika LLC</span>
        </p>
      </div>
    </footer>
  );
}
