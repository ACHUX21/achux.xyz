# DeepBugHunter — UI mock

Self-contained static prototype of the DeepBugHunter evidence console.

## Open

Hosted at https://achux.xyz/deepbughunter/ (demo UI mock).

```bash
# From this folder — any static server, or just open the file:
open index.html
# or
python3 -m http.server 8765
# then visit http://127.0.0.1:8765/
```

No build step, no npm. Works offline: IBM Plex fonts are bundled under `assets/fonts/` with system-font fallbacks.

**Demo data only.** Targets (`acme-http`, etc.), findings, and hashes are fictional fixtures. No real CVEs or bounty claims.

## Screens (hash routes)

| Route | Screen |
|-------|--------|
| `#/` | Missions home |
| `#/mission` | Mission overview (Main tick, ScopeGrant, budgets, Scope Guard) |
| `#/knowledge` | Knowledge / attack surface (Recon) |
| `#/hypotheses` | Hypothesis portfolio (scheduler ranking) |
| `#/experiment` | Live experiment run (runner log, guard, artifacts) |
| `#/evidence` | Finding on evidence ladder L0–L6 |
| `#/dossier` | Reporter dossier (REPORT_READY) |
| `#/events` | Append-only event log (system of record) |

Keyboard: keys `1`–`7` jump between mission screens when focus is not in an input.

## Product invariants reflected here

- Event log is the system of record; the UI is a client.
- Evidence ladder L0–L6; nothing below L3 is reportable.
- Scope Guard is mandatory, not an LLM, and shows ALLOW + DENY.
- Roster roles (Main, Recon, Hypothesis Builder, Experimenter, Verifier, Reporter) — not a chatbot list.
- Track A demo: local source-repo variant analysis + harness/fuzz.

## Files

- `index.html` — shell
- `styles.css` — visual system
- `data.js` — single coherent demo dataset
- `app.js` — hash router + screen renderers
- `assets/fonts/` — IBM Plex Sans / Mono / Serif (OFL)
