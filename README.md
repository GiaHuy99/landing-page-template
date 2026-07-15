# Landing Page Template

Reusable **Next.js 16 + Tailwind CSS v4 + Cloudflare (OpenNext)** starter for single-page marketing sites.

No project-specific images, logos, or branding are included — everything uses placeholders and generic demo content so you can fork and customize quickly.

## Quick start

```bash
cd landing-page-template
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Start a new landing page in 15 minutes

1. **Brand** — edit [`src/config/site.ts`](src/config/site.ts) (`name`, `tagline`, `locale`, `description`).
2. **Contact** — edit [`src/config/contact.ts`](src/config/contact.ts).
3. **Sections** — toggle `enabled` flags in `site.sections` (hero, about, projects, news, ROI, etc.).
4. **Copy** — replace files under [`src/content/`](src/content/) (`hero.ts`, `about.ts`, `projects.ts`, …).
5. **Images** — replace [`public/images/placeholder.jpg`](public/images/placeholder.jpg) and [`public/images/placeholder-logo.svg`](public/images/placeholder-logo.svg), then update paths in content files (or keep using [`src/config/assets.ts`](src/config/assets.ts) constants).
6. **EmailJS** — set `NEXT_PUBLIC_EMAILJS_*` in `.env.local`.
7. **Deploy** — `npm run deploy` (Cloudflare Workers via OpenNext).

## Project structure

```
src/
  app/           # layout, page composer, globals.css
  components/    # ui, layout, hero, sections, gallery, floating, forms
  config/        # site, navigation, contact, assets
  content/       # all demo copy & data (edit per project)
  hooks/         # carousel, focus trap, reduced motion, in-view
  lib/           # scroll, EmailJS, validation, lead tracking
  registry/      # sectionRegistry maps IDs → components
public/images/   # placeholder.jpg + placeholder-logo.svg only
```

## Enabling optional sections

In `src/config/site.ts`, set `enabled: true` for:

| Section ID     | Component           | Purpose                          |
|----------------|---------------------|----------------------------------|
| `news`         | `NewsSection`       | Static or CMS articles           |
| `foodtravel`   | `FoodTravelSection` | Dual card lightbox galleries     |
| `roi`          | `ROISimulator`      | Demo ROI calculator + lead modal |
| `zoning`       | `ZoningSection`     | Location comparison cards        |

Always-on chrome: `NavBar`, `Footer`. Optional widgets in `site.widgets`:

- `floatingNav` (default on)
- `contactFloat` (default on)
- `offerPin` / `welcomePopup` (default off — enable for CRO)

## News: static vs CMS

Edit [`src/content/news.ts`](src/content/news.ts):

- `source: "static"` — uses the local `articles` array.
- `source: "cms"` — set `cmsUrl` to your API; the section maps common response shapes.

## Images / Next.js remote domains

This template only uses local placeholders. If you load remote images later, add `images.remotePatterns` in [`next.config.ts`](next.config.ts).

## Scripts

| Script            | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Local Next.js dev server             |
| `npm run build`   | Production build                     |
| `npm run check`   | Build + TypeScript check             |
| `npm run deploy`  | OpenNext build + Cloudflare deploy   |
| `npm run preview` | OpenNext Cloudflare preview          |
| `npm run cf-typegen` | Regenerate Cloudflare `env.d.ts`  |

## Design tokens

Tailwind v4 tokens live in [`src/app/globals.css`](src/app/globals.css): `navy`, `gold`, `cream`, `ink`. Adjust there for a new brand palette. Fonts default to the system stack; add Google Fonts in `layout.tsx` when needed.

## Lead capture

All forms go through [`src/lib/sendLeadEmail.ts`](src/lib/sendLeadEmail.ts) with source tracking from [`src/lib/leadTracking.ts`](src/lib/leadTracking.ts). Without EmailJS env vars, the UI shows a clear configuration message instead of failing silently.
