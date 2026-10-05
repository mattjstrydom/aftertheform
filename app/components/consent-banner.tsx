"use client";

import { useState, useSyncExternalStore } from "react";

const KEY = "atf-consent";
const SIGNALS = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"];

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function ConsentBanner() {
  const [done, setDone] = useState(false);
  // "ssr" on the server keeps the banner out of the static HTML; the client reads the saved choice.
  const saved = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(KEY);
      } catch {
        return null;
      }
    },
    () => "ssr",
  );
  const show = saved === null && !done;

  const choose = (granted: boolean) => {
    const v = granted ? "granted" : "denied";
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    if (granted) {
      // GTM only reads Arguments objects pushed to dataLayer
      (function dl(..._cmd: unknown[]) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      })("consent", "update", Object.fromEntries(SIGNALS.map((s) => [s, v])));
    }
    setDone(true);
  };

  if (!show) return null;
  const b =
    "rounded-md border-2 border-ink bg-white px-5 py-2 text-base font-medium text-ink hover:bg-paper-2";
  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white p-4 shadow-[0_-4px_16px_rgb(23_32_42/0.08)]"
    >
      <div className="wrap flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base">
          This site uses cookies for analytics and advertising measurement.{" "}
          <a href="/privacy" className="link">Privacy policy</a>
        </p>
        <div className="flex gap-3">
          <button type="button" className={b} onClick={() => choose(true)}>Accept</button>
          <button type="button" className={b} onClick={() => choose(false)}>Decline</button>
        </div>
      </div>
    </section>
  );
}
