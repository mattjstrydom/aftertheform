import Link from "next/link";

export default function Footer() {
  return (
    <footer className="on-dark bg-deep py-10 text-base text-[#bec9c6]">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p>After the Form is run by Matt Strydom. Reubika LLC, USA</p>
        <p>
          <Link href="/privacy" className="link">Privacy policy</Link>
          <span className="ml-6">© {new Date().getFullYear()} Reubika LLC</span>
        </p>
      </div>
    </footer>
  );
}
