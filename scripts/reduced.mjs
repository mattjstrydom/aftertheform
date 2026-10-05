import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 900 });
await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await p.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await p.evaluate(() => localStorage.setItem("atf-consent", "denied"));
await p.screenshot({ path: "../shots/reduced.png", clip: { x: 0, y: 420, width: 1280, height: 420 } });
await b.close();
