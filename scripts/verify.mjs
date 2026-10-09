// Dev helper: checks for the update brief (canonical/OG, consent flows, JSON-LD, hero gap, placeholders).
import puppeteer from "puppeteer-core";
const BASE = "http://localhost:3001";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });

// canonical + OG on every page
for (const path of ["/", "/privacy", "/sample-report", "/teardown"]) {
  const p = await b.newPage();
  await p.goto(BASE + path, { waitUntil: "networkidle0" });
  const r = await p.evaluate(() => ({
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    ogUrl: document.querySelector('meta[property="og:url"]')?.content,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    skip: document.querySelector("a")?.textContent,
    brackets: (document.body.innerText.match(/\[[^\]]+\]/g) || []).join("|"),
  }));
  console.log(path, JSON.stringify(r));
  await p.close();
}

// consent flows in a fresh, isolated context (like a private window)
const ctx = await b.createBrowserContext();
const p = await ctx.newPage();
await p.setViewport({ width: 1280, height: 900 });
await p.goto(BASE, { waitUntil: "networkidle0" });
const banner = () => p.evaluate(() => !!document.querySelector('section[aria-label="Cookie consent"]'));
const consentState = () =>
  p.evaluate(() => {
    const st = {};
    for (const e of window.dataLayer) if (e && e[0] === "consent") Object.assign(st, e[2]);
    return JSON.stringify(st);
  });
const clickText = (t) => p.evaluate((t) => [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === t)?.click(), t);
console.log("1 banner on first visit:", await banner(), "| state:", await consentState());
await clickText("Decline");
console.log("2 after Decline:", await banner(), await consentState(), "| stored:", await p.evaluate(() => localStorage.getItem("cl-consent")));
await clickText("Cookie settings");
console.log("3 Cookie settings reopens:", await banner());
await clickText("Accept");
console.log("4 after Accept:", await banner(), await consentState());
await clickText("Cookie settings");
await clickText("Decline");
console.log("5 Accept then Decline:", await consentState(), "| stored:", await p.evaluate(() => localStorage.getItem("cl-consent")));
console.log("gtm scripts:", await p.evaluate(() => document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]').length), "| tag assistant iframes:", await p.evaluate(() => document.querySelectorAll('iframe[src*="tagassistant"]').length));
const ld = await p.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)));
console.log("json-ld blocks:", ld.length, "types:", ld[0]["@graph"].map((x) => x["@type"]).join(","));
await ctx.close();

// hero gap between buttons and the next section heading
for (const w of [360, 390, 430]) {
  const pg = await b.newPage();
  await pg.setViewport({ width: w, height: 900 });
  await pg.goto(BASE, { waitUntil: "networkidle0" });
  const r = await pg.evaluate(() => {
    const btn = [...document.querySelectorAll("a")].find((a) => a.textContent.trim() === "See a sample report");
    const strip = [...document.querySelectorAll("p")].find((x) => x.textContent.startsWith("Included in every check"));
    const replay = [...document.querySelectorAll("button")].find((x) => x.textContent === "Replay");
    const h2 = [...document.querySelectorAll("h2")].find((x) => x.textContent.startsWith("Smart Bidding"));
    const y = (e) => Math.round(e.getBoundingClientRect().top + scrollY);
    const bt = (e) => Math.round(e.getBoundingClientRect().bottom + scrollY);
    return { stripToReplay: y(replay) - bt(strip), replayToHeading: y(h2) - bt(replay), overflow: document.documentElement.scrollWidth > innerWidth };
  });
  console.log("hero", w, JSON.stringify(r));
  await pg.screenshot({ path: `../shots/hero-${w}.png`, clip: { x: 0, y: 600, width: w, height: 1300 }, captureBeyondViewport: true });
  await pg.close();
}
await b.close();
