import { validate, type FormType, type Fields } from "@/app/validate";

const API = "https://api.sequenzy.com/api/v1";
const NOTIFY_TO = "hello@aftertheform.com";

const str = (v: unknown) => (typeof v === "string" ? v : "");
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
// keep header values (subject, reply-to name) on one line and free of address punctuation
const oneLine = (s: string) => s.replace(/[\r\n<>",;]+/g, " ").trim();

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill it. Pretend success so bots don't retry.
  if (str(body.company_fax)) return Response.json({ ok: true });

  const type: FormType = body.type === "teardown" ? "teardown" : "check";
  const f: Fields = {
    name: str(body.name).trim(),
    email: str(body.email).trim(),
    website: str(body.website).trim(),
    tier: type === "check" ? str(body.tier) : "",
    note: str(body.note).trim(),
  };
  const errors = validate(f, type);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const key = process.env.SEQUENZY_API_KEY;
  if (!key) return Response.json({ error: "Form is not configured." }, { status: 500 });

  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const label = type === "teardown" ? "Free teardown" : "Check request";
  const rows: [string, string][] = [
    ["Type", label],
    ["Name", f.name],
    ["Email", f.email],
    [type === "teardown" ? "Page your ads point to" : "Company website", f.website],
    ...(type === "check" ? ([["Marketing Hub tier", f.tier]] as [string, string][]) : []),
    ["Note", f.note || "(none)"],
  ];

  // 1) Store the lead. "overwrite" so a repeat submitter's latest details land
  //    (the default, "skip", leaves existing subscribers untouched).
  const subscriber = fetch(`${API}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: f.email,
      firstName: f.name.split(/\s+/)[0],
      tags: [type === "teardown" ? "teardown" : "check-request"],
      customAttributes: {
        fullName: f.name,
        note: f.note,
        requestType: type,
        source: type === "teardown" ? "aftertheform.com/teardown" : "aftertheform.com",
        website: f.website,
        ...(type === "check" ? { marketingHubTier: f.tier } : {}),
      },
      duplicateStrategy: "overwrite",
      enrollInSequences: false,
    }),
  }).catch(() => null);

  // 2) Email the submission to us. Replying goes to the submitter.
  const notify = fetch(`${API}/transactional/send`, {
    method: "POST",
    headers: { ...headers, "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({
      to: NOTIFY_TO,
      replyTo: `${oneLine(f.name) || "Lead"} <${f.email}>`,
      subject: `${label}: ${oneLine(f.name)}`,
      html: `<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 sans-serif">${rows
        .map(([k, v]) => `<tr><td style="color:#5c6764;vertical-align:top"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
        .join("")}</table>`,
    }),
  }).catch(() => null);

  const [s, n] = await Promise.all([subscriber, notify]);
  if (!s?.ok) console.error("sequenzy subscriber failed", s?.status);
  if (!n?.ok) console.error("sequenzy notify failed", n?.status);

  // the lead is safe if either went through
  if (!s?.ok && !n?.ok) return Response.json({ error: "Upstream failed." }, { status: 502 });
  return Response.json({ ok: true });
}
