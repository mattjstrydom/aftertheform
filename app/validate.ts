export const TIERS = ["Starter", "Professional", "Enterprise", "Not sure"] as const;

export type Fields = { name: string; email: string; website: string; tier: string; note: string };
export type Errors = Partial<Record<keyof Fields, string>>;

// Shared by the form (inline messages) and the route handler (server-side check).
export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim() || f.name.length > 120) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()) || f.email.length > 200)
    e.email = "Enter a work email like name@company.com.";
  if (!/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(f.website.trim()) || f.website.length > 200)
    e.website = "Enter your company website, like example.com.";
  if (!(TIERS as readonly string[]).includes(f.tier)) e.tier = "Choose a Marketing Hub tier.";
  if (f.note.length > 2000) e.note = "Shorten your note to 2,000 characters or fewer.";
  return e;
}
