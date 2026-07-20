# achux.xyz

Personal portfolio of **Achraf "ACHUX21" Ouazzani Chahidi** — Web Security Specialist.

Single-page site with an animated violet "aurora + glass" aesthetic. Built with
[Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output → dist/
pnpm preview
```

## Structure

- `src/data/*.ts` — all content (single source of truth: site, skills, projects, ctf).
  Edit these to update the site.
- `src/components/*.astro` — page sections (Nav, Hero, About, Skills, Projects, CTF, Contact)
  plus `Aurora` (background) and `Icon`.
- `src/styles/global.css` — design tokens (OKLCH violet, hue 265), glass/aurora/reveal.
- `src/layouts/Base.astro` — `<head>`, theme toggle, scroll-reveal observer.

## TODO

- Add `public/resume.pdf` and `public/og.png`.
- Point the `achux.xyz` DNS at the deployment (Cloudflare Pages / Vercel).
