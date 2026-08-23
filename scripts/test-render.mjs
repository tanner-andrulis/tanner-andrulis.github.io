#!/usr/bin/env node
// Builds the site, then checks every page rendered and every internal link resolves.
// Usage: node scripts/test-render.mjs [--no-build] [--external]
//   --no-build   check an existing ./docs instead of building first
//   --external   also fetch every outbound link (slow, needs network)

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const OUT = resolve("docs");
const SITE = "https://tanner-andrulis.github.io";

if (!process.argv.includes("--no-build")) {
  execFileSync("npx", ["astro", "build"], { stdio: "inherit" });
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

const pages = walk(OUT).filter((f) => f.endsWith(".html"));
const errors = [];
const warn = (msg) => errors.push(msg);

// 1. Every page plus every publication must exist in the output.
const slugs = readdirSync("src/pages/posts").map((f) => f.replace(/\.md$/, ""));
const required = ["index.html", "cv/index.html", "contact/index.html", "sitemap-index.xml",
                  ...slugs.map((s) => `posts/${s}/index.html`)];
for (const want of required) {
  if (!existsSync(join(OUT, want))) warn(`missing page: ${want}`);
}

// 2. The old Quarto .html URLs must still exist, as files, and redirect.
for (const want of ["CV.html", "contact.html", "about.html", "profile.html",
                    ...slugs.map((s) => `posts/${s}/post.html`)]) {
  const target = join(OUT, want);
  if (!existsSync(target) || !statSync(target).isFile()) warn(`missing redirect: ${want}`);
  else if (!readFileSync(target, "utf8").includes('http-equiv="refresh"')) {
    warn(`redirect does not redirect: ${want}`);
  }
}

// 3. Real pages must carry a title and actual content.
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const rel = relative(OUT, page);
  if (html.includes('http-equiv="refresh"')) continue;
  if (!/<title>[^<]+<\/title>/.test(html)) warn(`no <title>: ${rel}`);
  const body = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? "";
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length < 80) warn(`little or no content in <main>: ${rel}`);
}

// 4. Internal links and assets must resolve to something on disk.
const resolves = (url) => {
  const target = join(OUT, decodeURIComponent(url.split(/[?#]/)[0]));
  return (
    existsSync(target) &&
    (statSync(target).isFile() || existsSync(join(target, "index.html")))
  );
};

let checked = 0;
const external = new Set();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const rel = relative(OUT, page);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^https?:\/\//.test(url)) external.add(url);
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    checked++;
    if (!resolves(url)) warn(`broken link in ${rel}: ${url}`);
  }
}

// 5. Outbound links, only when asked. Some hosts (ACM, LinkedIn) answer automated
// requests with 403/999, so those count as reachable.
if (process.argv.includes("--external")) {
  const targets = [...external].filter((u) => !u.startsWith(SITE)).sort();
  console.log(`\nChecking ${targets.length} outbound links...`);
  const results = await Promise.all(
    targets.map(async (url) => {
      try {
        const res = await fetch(url, {
          redirect: "follow",
          headers: { "user-agent": "Mozilla/5.0" },
          signal: AbortSignal.timeout(25000),
        });
        return [url, res.status];
      } catch (e) {
        return [url, e.name === "TimeoutError" ? "timeout" : "unreachable"];
      }
    }),
  );
  for (const [url, status] of results) {
    const ok = status === 200 || status === 403 || status === 999;
    console.log(`  ${ok ? "ok  " : "WARN"} ${String(status).padEnd(11)} ${url}`);
    if (!ok) warn(`outbound link ${status}: ${url}`);
  }
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of new Set(errors)) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`\n✓ ${pages.length} pages, ${checked} internal links — all OK`);
