# achux.xyz

Personal site of Achraf Ouazzani Chahidi (ACHUX21). Astro + Tailwind CSS v4.

Personal site of Achraf Ouazzani Chahidi. The Dalian street plate is the hero. The record and three writeup case files carry the page. Dark only.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output → dist/
pnpm preview
```

## Structure

- `src/data/*.ts` — copy and records (site, skills, projects, record).
- `src/components/*.astro` — nav, hero, whoami, record, work, contact.
- `src/styles/global.css` — dusk tokens. IBM Plex Mono for the whole page.
- `public/images/plate-dalian.webp` — the Dalian street plate. `public/og.png` is the share card.
- `public/.well-known/security.txt` — RFC 9116. `public/.nojekyll` keeps that folder on GitHub Pages.

Public email is `21@achux.xyz`.
