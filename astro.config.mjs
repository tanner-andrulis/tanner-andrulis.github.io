import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tanner-andrulis.github.io",
  outDir: "./docs", // GitHub Pages serves this repo from /docs
  integrations: [sitemap()],
  image: { layout: "constrained", responsiveStyles: true },
});
