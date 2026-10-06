"use client";

import { OPEN_EVENT } from "./consent-banner";

export default function CookieSettings() {
  return (
    <button type="button" className="link" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
