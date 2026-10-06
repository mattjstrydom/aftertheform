"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { TIERS, validate, type Errors, type Fields, type FormType } from "@/app/validate";

const empty: Fields = { name: "", email: "", website: "", tier: "", note: "" };
const input =
  "mt-1 block w-full rounded-xl border border-[#7b8a86] bg-paper px-3 py-2.5 text-base text-ink";

const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL;

export default function RequestForm({ type = "check" }: { type?: FormType }) {
  const teardown = type === "teardown";
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(f, type);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, type, company_fax: (form.current?.elements.namedItem("company_fax") as HTMLInputElement | null)?.value }),
      });
      if (res.status === 422) {
        setErrors((await res.json()).errors);
        setStatus("idle");
      } else setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok")
    return (
      <div role="status" className="rounded-[10px] border border-hairline bg-white p-6">
        <p className="text-xl font-medium">
          {teardown ? "Thanks. We'll email you the recording." : "Thanks. We'll reply within one business day."}
        </p>
      </div>
    );

  const field = (k: keyof Fields, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={k} className="block font-medium">{label}</label>
      {el}
      {errors[k] && (
        <p id={`${k}-err`} className="mt-1 text-base text-[#b3261e]">{errors[k]}</p>
      )}
    </div>
  );
  const aria = (k: keyof Fields) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <>
      <form ref={form} onSubmit={submit} noValidate className="space-y-5">
        {field("name", "Name", <input {...aria("name")} required className={input} autoComplete="name" value={f.name} onChange={set("name")} />)}
        {field("email", "Work email", <input {...aria("email")} required type="email" className={input} autoComplete="email" value={f.email} onChange={set("email")} />)}
        {field(
          "website",
          teardown ? "The page your ads point to" : "Company website",
          <input {...aria("website")} required className={input} autoComplete="url" inputMode="url" value={f.website} onChange={set("website")} />,
        )}
        {!teardown &&
          field(
            "tier",
            "Marketing Hub tier",
            <select {...aria("tier")} required className={input} value={f.tier} onChange={set("tier")}>
              <option value="">Select a tier</option>
              {TIERS.map((t) => <option key={t}>{t}</option>)}
            </select>,
          )}
        {field("note", "Note (optional)", <textarea {...aria("note")} rows={4} className={input} value={f.note} onChange={set("note")} />)}

        {/* honeypot: hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>Leave this empty<input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div aria-live="assertive">
          {status === "error" && (
            <p className="text-base text-[#b3261e]">
              That didn&apos;t send. Check your connection and try again, or email <a href="mailto:hello@aftertheform.com" className="link">hello@aftertheform.com</a>.
            </p>
          )}
        </div>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {teardown ? "Request a teardown" : "Request a check"}
        </button>
        <p className="text-grey">
          {teardown ? "We'll email you the recording." : "We reply personally within one business day."}
        </p>
      </form>
      {teardown ? (
        <p className="mt-6">
          Ready for the full check? <Link href="/#request" className="link">Request a check</Link>
        </p>
      ) : (
        CAL_URL && (
          <p className="mt-6">
            Prefer to talk first?{" "}
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="link">
              Book a 20-minute fit call
            </a>
          </p>
        )
      )}
    </>
  );
}
