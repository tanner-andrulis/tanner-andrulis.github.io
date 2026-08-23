#!/usr/bin/env node
// Serves the built ./docs and screenshots key pages into ./screenshots/.
// Usage: node scripts/screenshot.mjs [--dark] [--width 1280]
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const OUT = resolve("docs");
const SHOTS = resolve("screenshots");
const args = process.argv.slice(2);
const dark = args.includes("--dark");
const width = Number(args[args.indexOf("--width") + 1]) || 1280;

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg",
  ".svg": "image/svg+xml", ".pdf": "application/pdf", ".xml": "application/xml",
};

const server = createServer((req, res) => {
  let path = join(OUT, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  if (!existsSync(path)) return res.writeHead(404).end("not found");
  res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
  res.end(readFileSync(path));
});

await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  colorScheme: dark ? "dark" : "light",
  deviceScaleFactor: 2,
});

const suffix = `${width}${dark ? "-dark" : ""}`;
for (const [name, url] of [
  ["home", "/"],
  ["cv", "/cv/"],
  ["contact", "/contact/"],
  ["post-cimloop", "/posts/2024_cimloop/"],
  ["post-tcm", "/posts/2026_turbo_charged_mapper/"],
  ["post-loopforest", "/posts/2026_loopforest/"],
]) {
  await page.goto(base + url);
  // Lazy images below the fold never load for a full-page capture unless made eager.
  await page.evaluate(() =>
    Promise.all([...document.images].map((i) => ((i.loading = "eager"), i.decode()))),
  );
  await page.screenshot({ path: join(SHOTS, `${name}-${suffix}.png`), fullPage: true });
  console.log(`${name}-${suffix}.png`);
}

await browser.close();
server.close();
