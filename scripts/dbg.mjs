import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage();
p.on("response", (r) => r.status() >= 400 && console.log(r.status(), r.url()));
await p.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await b.close();
