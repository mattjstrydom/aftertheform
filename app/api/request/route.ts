import { validate, type FormType, type Fields } from "@/app/validate";

const str = (v: unknown) => (typeof v === "string" ? v : "");

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
    name: str(body.name),
    email: str(body.email),
    website: str(body.website),
    tier: type === "check" ? str(body.tier) : "",
    note: str(body.note),
  };
  const errors = validate(f, type);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const key = process.env.SEQUENZY_API_KEY;
  if (!key) return Response.json({ error: "Form is not configured." }, { status: 500 });

  const attributes =
    type === "teardown"
      ? { landingPage: f.website.trim(), requestType: "teardown", source: "aftertheform.com/teardown" }
      : { website: f.website.trim(), marketingHubTier: f.tier, requestType: "check", source: "aftertheform.com" };

  const res = await fetch("https://api.sequenzy.com/api/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: f.email.trim(),
      firstName: f.name.trim().split(/\s+/)[0],
      tags: [type === "teardown" ? "teardown" : "check-request"],
      customAttributes: { fullName: f.name.trim(), note: f.note.trim(), ...attributes },
      enrollInSequences: false,
    }),
  }).catch(() => null);

  if (!res || !res.ok) return Response.json({ error: "Upstream failed." }, { status: 502 });
  return Response.json({ ok: true });
}
