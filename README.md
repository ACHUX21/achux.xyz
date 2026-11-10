# achux.xyz

Personal site of Achraf Ouazzani Chahidi (ACHUX21). Astro + Tailwind CSS v4.

The page is a stack of layers: a Dalian plate, a blank clay figure, and a protocol log of the CTF record, bounties, and the work. Dark only.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output → dist/
pnpm preview
```

## Structure

- `src/data/*.ts` — copy and records (site, skills, projects, record).
- `src/components/*.astro` — nav, hero, whoami, record, work, stack, contact.
- `src/styles/global.css` — hue-300 tokens and the Wired layout.
- `public/images/` — generated plates and the figure passes.

Public email is `21@achux.xyz`.
