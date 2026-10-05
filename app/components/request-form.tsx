"use client";

import { useRef, useState } from "react";
import { TIERS, validate, type Errors, type Fields } from "@/app/validate";
import Ph from "./ph";

const empty: Fields = { name: "", email: "", website: "", tier: "", note: "" };
const input =
  "mt-1 block w-full rounded-[4px] border border-[#7b848f] bg-white px-3 py-2.5 text-base text-ink";

export default function RequestForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(f);
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
        body: JSON.stringify({ ...f, company_fax: (form.current?.elements.namedItem("company_fax") as HTMLInputElement | null)?.value }),
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
        <p className="text-xl font-medium">Thanks. I&apos;ll reply within <Ph>[one business day]</Ph>.</p>
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
    <form ref={form} onSubmit={submit} noValidate className="space-y-5">
      {field("name", "Name", <input {...aria("name")} className={input} autoComplete="name" value={f.name} onChange={set("name")} />)}
      {field("email", "Work email", <input {...aria("email")} type="email" className={input} autoComplete="email" value={f.email} onChange={set("email")} />)}
      {field("website", "Company website", <input {...aria("website")} className={input} autoComplete="url" inputMode="url" value={f.website} onChange={set("website")} />)}
      {field(
        "tier",
        "Marketing Hub tier",
        <select {...aria("tier")} className={input} value={f.tier} onChange={set("tier")}>
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
            That didn&apos;t send. Check your connection and try again, or email <Ph>[contact email]</Ph>.
          </p>
        )}
      </div>
      <button type="submit" className="btn" disabled={status === "sending"}>Request a check</button>
      <p className="text-grey">I reply within <Ph>[one business day]</Ph>.</p>
    </form>
  );
}
