// Dev helper: full-page screenshots at the four breakpoints.
import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const w of [360, 768, 1280, 1600]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: 900 });
  await p.goto("http://localhost:3001", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 4500));
  await p.evaluate(() => localStorage.setItem("atf-consent", "denied"));
  await p.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 4500));
  const over = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(w, "h-overflow:", over);
  await p.screenshot({ path: `${process.env.OUT}/shot-${w}.png`, fullPage: true });
  await p.close();
}
await b.close();
