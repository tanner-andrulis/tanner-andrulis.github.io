import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tanner-andrulis.github.io",
  outDir: "./docs", // GitHub Pages serves this repo from /docs
  // Pages serves `x.html` for a bare `/x`, so the legacy redirects would shadow
  // the real pages. Always linking to `/x/` reaches `x/index.html` directly.
  trailingSlash: "always",
  integrations: [sitemap()],
  image: { layout: "constrained", responsiveStyles: true },
});
