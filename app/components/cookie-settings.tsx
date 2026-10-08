"use client";

import { OPEN_EVENT } from "./consent-banner";

export default function CookieSettings({ className = "link" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
