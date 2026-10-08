import Link from "next/link";
import { site } from "../site.config";

// Every booking button on the site goes to the Cal.com link in site.calUrl, same tab, no embed.
export function CalButton({ className = "", children = "Book a 20-minute fit call" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a href={site.calUrl} className={`btn ${className}`}>
      {children}
    </a>
  );
}

export function SampleButton({ className = "", children = "See a sample report" }: { className?: string; children?: React.ReactNode }) {
  return (
    <Link href="/sample-report" className={`btn-outline ${className}`}>
      {children}
    </Link>
  );
}
