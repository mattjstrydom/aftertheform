"use client";

import { useState } from "react";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map(({ q, a }, i) => (
        <div key={q} className="border-b border-hairline last:border-0">
          <h3 className="text-lg">
            <button
              type="button"
              id={`faq-b-${i}`}
              aria-expanded={open === i}
              aria-controls={`faq-p-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left font-medium"
            >
              {q}
              <span aria-hidden="true" className="text-2xl leading-none text-grey">
                {open === i ? "−" : "+"}
              </span>
            </button>
          </h3>
          <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={open !== i}>
            <p className="max-w-[64ch] pb-5 text-grey">{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
