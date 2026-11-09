# achux.xyz

Personal portfolio of **Achraf "ACHUX21" Ouazzani Chahidi** — Web Security Specialist.

A dark lab-notebook site. Content lives in `src/data`. The hero scope is a lazy React Three Fiber island with an SVG fallback; experiment cards tilt with CSS 3D. Scroll reveals use GSAP ScrollTrigger. `⌘K` / `Ctrl K` opens the command palette.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output → dist/
pnpm preview
```

## Structure

- `src/data/*.ts` — site, experiments, skills, CTF, writeups, command palette.
- `src/components/*.astro` — page sections.
- `src/components/islands/` — React islands (scope globe, command palette).
- `src/styles/global.css` — ink background, mint accent, hairline grid, glass.
- `src/layouts/Base.astro` — head, view transitions, motion, palette.
