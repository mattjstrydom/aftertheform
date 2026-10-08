// Native <details name="faq"> accordion: zero JS, keyboard support built in, one open at a time.
export type FaqItem = { q: string; a: React.ReactNode };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map(({ q, a }) => (
        <details key={q} name="faq" className="border-t border-gray-100 first:border-0">
          <summary className="flex justify-between gap-6 py-5 text-text-xl font-medium">
            {q}
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p className="max-w-[64ch] pb-5 text-gray-600">{a}</p>
        </details>
      ))}
    </div>
  );
}
