# tanner-andrulis.github.io

Static personal site built with [Astro](https://astro.build). No client-side JavaScript,
no CMS — every page is plain HTML rendered at build time.

## Setup

Needs Node ≥ 22.12 ([nodejs.org](https://nodejs.org)). Then:

```sh
make setup
```

installs the npm dependencies and the headless Chromium that `make screenshot` uses. On a
bare Linux box Chromium may also need system libraries: `npx playwright install --with-deps chromium`.

## Commands

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `make dev`        | Live-reload server on http://localhost:4321 (Ctrl-C to stop)        |
| `make build`      | Render the site into `docs/`                                        |
| `make preview`    | Build, then serve `docs/` exactly as it will be published           |
| `make test`       | Build, then verify every page, redirect, and internal link          |
| `make links`      | Same, plus check every outbound link still resolves (needs network) |
| `make check`      | Type-check the `.astro` files                                       |
| `make screenshot` | Render key pages to `screenshots/` in light, dark, and mobile       |

`make dev` is for editing; `make preview` is the one to trust before pushing, since it
serves the real built output. The sitemap is generated at build time only, so
`/sitemap-index.xml` 404s under `make dev`.

## Deploying

GitHub Pages serves this repo from the `docs/` folder on `main` (Settings → Pages). So:
`make build`, commit `docs/` along with the source change, push. `docs/.nojekyll` must
stay, or Pages drops the `_astro/` asset directory.

## Adding a publication or talk

Create one Markdown file in `src/pages/posts/`. The filename is the URL, so
`2027_my_paper.md` is served at `/posts/2027_my_paper`, and it appears on the home page
and the CV page automatically, newest first.

```markdown
---
layout: ../../layouts/Post.astro
title: The Full Paper Title
authors: First Author, Second Author
venue: ISCA 2027           # or "Under submission", "arXiv preprint", ...
date: 2027-06-17           # omit for unpublished work with no public date
award: Best Paper Award    # optional
categories: [Publications, Compute-In-Memory]
links:                     # optional, rendered in order
  Paper: https://arxiv.org/abs/...
  Code: https://github.com/...
  Slides: /posts/2027_my_paper/talk.pdf
video: https://www.youtube.com/embed/VIDEO_ID   # optional
---

The abstract goes here.
```

- **Figure:** put `src/assets/posts/2027_my_paper.png` (same name as the post) and it is
  picked up automatically. Commit the full-resolution original; Astro resizes and
  converts it to WebP at build time.
- **Slides and posters** go in `public/posts/2027_my_paper/` and are linked with an
  absolute path. Files under `public/` are copied verbatim.
- Entries without a `date` sort to the top, which is what you want for work that is
  still under submission.

## Other content

| What                        | Where                                             |
| --------------------------- | ------------------------------------------------- |
| Bio and headshot            | `src/pages/index.astro`, `src/assets/profile.jpg` |
| CV page                     | `src/pages/cv.md`                                 |
| Downloadable CV             | `public/CV.pdf`                                   |
| Contact page                | `src/pages/contact.md`                            |
| Nav links, `<head>`, footer | `src/layouts/Base.astro`                          |
| Colors, type, layout        | `src/styles/global.css`                           |

## Old URLs

The previous Quarto site published `.html` URLs. `src/pages/[...legacy].html.ts`
generates a redirect at each of them (`/CV.html`, `/posts/<slug>/post.html`, …) so
existing links and search results keep working. GitHub Pages serves `x.html` for a bare
`/x` before `x/index.html`, so those redirect files would shadow the real pages: internal
links therefore always end in `/` (`trailingSlash: "always"`), and `make test` fails on a
missing redirect or on any link that lands on a redirect instead of a page.
