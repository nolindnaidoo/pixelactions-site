# pixelactions-site

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![pixelactions.dev](https://img.shields.io/badge/web-pixelactions.dev-00A0FF.svg)](https://pixelactions.dev)

The promo and search site for
[pixelactions](https://github.com/nolindnaidoo/pixelactions), the
executor half of the [pixelcoords](https://pixelcoords.dev) loop. Built
by [nolindnaidoo](https://github.com/nolindnaidoo).

Static Next.js export. **Local-only today** — the tool is unpublished
(no crates.io release, no GitHub repo yet); the site deploys to Vercel
by push to `main` when the tool publishes.

## The family

- **[pixelactions](https://github.com/nolindnaidoo/pixelactions)** — the
  tool this site stages: the `pixelactions` binary plus
  `pixelactions-core`, the platform-free core (flow schema, plan
  resolution, coordinate conversion, run reports). Reads sessions
  through `pixelcoords-core`.
- **[pixelcoords](https://github.com/nolindnaidoo/pixelcoords)** — the
  capture half of the loop, live at
  [pixelcoords.dev](https://pixelcoords.dev)
  ([site repo](https://github.com/nolindnaidoo/pixelcoords-site)): the
  `pixelcoords` binary plus
  [`pixelcoords-core`](https://crates.io/crates/pixelcoords-core), both
  on crates.io.

## The page set (capped at six)

| Page | Job |
|------|-----|
| `/` | The 10-second pitch: thesis, flow file, the loop, install, comparison table |
| `/vs/pyautogui` | The incumbent's searchers — coordinates out of code, verified execution |
| `/vs/sikulix` | Automation searchers — split loop vs see-and-act runtime |
| `/vs/autohotkey` | Windows searchers — a list of steps vs a language |
| `/how-to/automate-desktop-clicks` | One how-to for the whole query family, mac/Windows/Linux sections |
| (spare) | Filled only if search data earns it |

## The maintenance contract

Every ritual with exact commands lives in [MAINTENANCE.md](MAINTENANCE.md).

Every version-specific claim about another tool lives in that page's
single comparison-table component, stamped "verified against X vY,
<date>". Prose argues philosophy only (what the tools *are*), so it
does not go stale. Re-verification = walk the tables, update stamps —
twice a year, calendared, about an hour. Negative claims are always
dated. Concessions are generous on purpose.

## Voice

The tool README's voice is canonical — short declaratives, no hype,
claims match reality. The site stages that content; it never forks it.
