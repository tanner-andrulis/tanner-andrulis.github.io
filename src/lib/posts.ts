import { basename } from "node:path";
import type { MarkdownInstance } from "astro";

export type Publication = {
  title: string;
  authors: string;
  venue?: string;
  /** Absent for unpublished work, which has no public date. */
  date?: string | Date;
  award?: string;
  categories?: string[];
  links?: Record<string, string>;
  video?: string;
};

const figures = import.meta.glob<ImageMetadata>("../assets/posts/*.png", {
  eager: true,
  import: "default",
});

/** Optimized figure for the post at `url`, if src/assets/posts/<slug>.png exists. */
export const figure = (url: string) => figures[`../assets/posts/${basename(url)}.png`];

// Unpublished work has no public date, so it sorts to the top as newest.
const sortKey = (p: MarkdownInstance<Publication>) =>
  p.frontmatter.date ? new Date(p.frontmatter.date).getTime() : Infinity;

/** Every publication/talk page, newest first. */
export const posts = Object.values(
  import.meta.glob<MarkdownInstance<Publication>>("../pages/posts/*.md", { eager: true }),
).sort((a, b) => sortKey(b) - sortKey(a));

export const monthYear = (date?: string | Date) =>
  date &&
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
