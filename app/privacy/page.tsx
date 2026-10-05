import Link from "next/link";
import type { Metadata } from "next";
import Ph from "../components/ph";

export const metadata: Metadata = { title: "Privacy policy | After the Form", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <main className="wrap py-16">
      <h1 className="text-4xl tracking-[-0.03em]">Privacy policy</h1>
      <p className="mt-6"><Ph>[Privacy policy text]</Ph></p>
      <p className="mt-8"><Link href="/" className="link">After the Form</Link></p>
    </main>
  );
}
