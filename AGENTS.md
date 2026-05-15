# AGENTS.md

This file provides guidance to AI Agent when working with code in this repository.

## Project Overview

Personal blog ("Dev Notes") built on the [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template. Uses Next.js 15 App Router, TypeScript, Tailwind CSS 4, and Contentlayer2 for MDX content processing.

## Commands

- `npm dev` — `cross-env INIT_CWD=$PWD next dev`
- `npm build` — `cross-env INIT_CWD=$PWD next build && cross-env NODE_OPTIONS='--experimental-json-modules' node ./scripts/postbuild.mjs`
- `npm lint` — `next lint --fix --dir pages --dir app --dir components --dir lib --dir layouts --dir scripts`
- `npm serve` — `next start`
- `npm analyze` — `cross-env ANALYZE=true next build`

Package manager: **npm**. Pre-commit hooks via Husky + lint-staged run ESLint and Prettier.

**Before committing, always run `npm run build` to verify the project builds successfully.**

## Architecture

### Content System

Blog posts live in `data/blog/` as `.md`/`.mdx` files, organized into subdirectories by topic (e.g., `ai/`, `go/`, `react/`). Author profiles are in `data/authors/`.

Contentlayer2 (`contentlayer.config.ts`) processes these files, generating typed content objects with computed fields: `slug`, `path`, `readingTime`, `toc`, `structuredData`. On build success, it writes `app/tag-data.json` (tag counts) and `public/search.json` (kbar search index).

**Blog frontmatter fields**: `title` (required), `date` (required), `tags`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `bibliography`, `canonicalUrl`.

### Routing (App Router)

- `app/layout.tsx` — Root layout with theme provider, analytics, comments
- `app/blog/` — Blog listing and individual post pages
- `app/tags/` — Tag listing and per-tag pages
- `app/about/`, `app/projects/` — Static pages
- `app/api/` — API routes (e.g., social image generation)

### Layout Components

`layouts/` contains page-level layout wrappers:

- `PostLayout` — Default blog post layout with sidebar
- `PostSimple` — Minimal post layout
- `PostBanner` — Post with banner image header
- `ListLayout` / `ListLayoutWithTags` — Blog listing pages with pagination

### Key Config Files

- `data/siteMetadata.js` — Site title, author, URLs, analytics (Umami), comments (Giscus), search (kbar)
- `next.config.mjs` — Contentlayer plugin, CSP headers, SVG support via `@svgr/webpack`
- `contentlayer.config.ts` — MDX pipeline (remark/rehype plugins), document type definitions
- `tsconfig.json` / `jsconfig.json` — Path aliases configured

### MDX Pipeline

Remark plugins: frontmatter extraction, GFM, code titles, math, image-to-JSX, GitHub alerts.
Rehype plugins: slug headings, autolink headings, KaTeX, citations, Prism+ syntax highlighting, minification.

### Environment Variables

- `NEXT_UMAMI_ID` — Umami analytics site ID
- `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID` — Giscus comment config
- `BASE_PATH` — Optional base path for deployment
- `EXPORT` — Set to enable static export
- `UNOPTIMIZED` — Disable image optimization
