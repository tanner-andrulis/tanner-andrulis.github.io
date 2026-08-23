// The old Quarto site published .html URLs. Emit a redirect at each one so
// inbound links and search results keep working.
import type { APIRoute } from "astro";
import { posts } from "../lib/posts";

const legacy: Record<string, string> = {
  CV: "/cv/",
  contact: "/contact/",
  about: "/",
  profile: "/",
  // Markdown pages always have a url.
  ...Object.fromEntries(posts.map((p) => [`${p.url!.slice(1)}post`, p.url!])),
};

export const getStaticPaths = () =>
  Object.entries(legacy).map(([from, to]) => ({ params: { legacy: from }, props: { to } }));

export const GET: APIRoute = ({ props, site }) => {
  const to = new URL(props.to, site);
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<title>Moved</title><link rel="canonical" href="${to}">` +
      `<meta http-equiv="refresh" content="0;url=${props.to}">` +
      `</head><body><p>This page moved to <a href="${props.to}">${props.to}</a>.</p></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
};
