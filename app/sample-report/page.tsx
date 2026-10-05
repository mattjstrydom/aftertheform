import Link from "next/link";
import type { Metadata } from "next";
import Ph from "../components/ph";

export const metadata: Metadata = { title: "Sample report | After the Form", alternates: { canonical: "/sample-report" } };

export default function SampleReport() {
  return (
    <main className="wrap py-16">
      <h1 className="text-4xl tracking-[-0.03em]">Sample report</h1>
      <p className="mt-6"><Ph>[Sample report]</Ph></p>
      <p className="mt-8"><Link href="/" className="link">After the Form</Link></p>
    </main>
  );
}
