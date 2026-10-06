import Link from "next/link";

const links = [
  ["/#how", "How it works"],
  ["/#price", "Price"],
  ["/#questions", "Questions"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-paper">
      <div className="wrap grid h-16 grid-cols-[1fr_auto] items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="text-xl font-medium tracking-[-0.04em]">
          After the Form
        </Link>
        <nav aria-label="Main" className="hidden gap-7 rounded-full bg-white px-7 py-2.5 text-sm font-medium sm:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:underline">{label}</Link>
          ))}
        </nav>
        <div className="justify-self-end">
          <Link href="/#request" className="btn btn-sm">Request a check</Link>
        </div>
      </div>
    </header>
  );
}
