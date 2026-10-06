import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-8 text-base text-grey">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <p>After the Form is run by Matt Strydom. Reubika LLC, USA</p>
        <p>
          <Link href="/privacy" className="link">Privacy policy</Link>
          <span className="ml-6">© {new Date().getFullYear()} Reubika LLC</span>
        </p>
      </div>
    </footer>
  );
}
