"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const KEY = "atf-consent";
const SIGNALS = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"];
export const OPEN_EVENT = "atf:open-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function ConsentBanner() {
  const [done, setDone] = useState(false);
  const [reopened, setReopened] = useState(false);
  const box = useRef<HTMLElement>(null);
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
  const show = reopened || (saved === null && !done);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (reopened) box.current?.focus();
  }, [reopened]);

  const choose = (granted: boolean) => {
    const v = granted ? "granted" : "denied";
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    // Defaults are already denied; an explicit update also covers someone who accepted earlier.
    // GTM only reads Arguments objects pushed to dataLayer.
    (function dl(..._cmd: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    })("consent", "update", Object.fromEntries(SIGNALS.map((s) => [s, v])));
    setDone(true);
    setReopened(false);
  };

  if (!show) return null;
  const b =
    "rounded-full border-2 border-ink bg-white px-6 py-2 text-base font-medium text-ink hover:bg-paper-2";
  return (
    <section
      ref={box}
      tabIndex={-1}
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white p-4 shadow-[0_-4px_16px_rgb(23_32_42/0.08)] outline-none"
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
