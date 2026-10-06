import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-paper">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-semibold tracking-[-0.02em]">
          After the Form
        </Link>
        <nav className="flex items-center gap-6 text-base">
          <Link href="/#how" className="hidden hover:underline sm:inline">How it works</Link>
          <Link href="/#price" className="hidden hover:underline sm:inline">Price</Link>
          <Link href="/#questions" className="hidden hover:underline sm:inline">Questions</Link>
          <Link href="/#request" className="btn btn-sm">Request a check</Link>
        </nav>
      </div>
    </header>
  );
}
