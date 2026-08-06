// THE claim-quarantine artifact. Every version-specific claim about another
// tool lives HERE and nowhere else, rendered by components/comparison-table
// with a visible "verified against <name> v<version>, <date>" stamp. Prose on
// pages argues philosophy only. Re-verification (calendared, twice yearly)
// touches only this file: check each tool's shipping version, update facts if
// they moved, restamp. Concessions are stated plainly and generously —
// competitor wins render with the same positive treatment as ours.

import { TOOL_VERSION } from './site'

export const ROW_KEYS = [
  'price',
  'platforms',
  'declarative',
  'languages',
  'relocation',
  'verification',
  'maintenance',
  'license',
] as const

export type RowKey = (typeof ROW_KEYS)[number]

export const ROW_LABELS: Record<RowKey, string> = {
  price: 'Price',
  platforms: 'Platforms',
  declarative: 'Declarative, reviewable flows',
  languages: 'Language it takes to drive it',
  relocation: 'Re-location before acting',
  verification: 'Verified execution',
  maintenance: 'Maintenance status',
  license: 'License',
}

export type Cell = {
  readonly value: string
  readonly wins?: boolean
  readonly note?: string
}

export type Competitor = {
  readonly slug: string
  readonly name: string
  readonly url: string
  readonly verifiedAgainst: { readonly version: string; readonly date: string }
  readonly cells: Record<RowKey, Cell>
}

// Our own column — sourced from the tool's README/docs at the version in
// lib/site.ts; the same truth rule applies to us.
export const PIXELACTIONS_CELLS: Record<RowKey, Cell> = {
  price: { value: 'Free', wins: true },
  platforms: {
    value: 'macOS · Windows · Linux (X11 + Wayland)',
    wins: true,
    note: 'X11 via XTEST, GNOME/KDE Wayland via the sanctioned portal + EIS path, Windows across the whole virtual desktop rather than the primary monitor — the incumbent everyone runs (PyAutoGUI) has no answer for Wayland at all. Windows multi-monitor is unit-tested but not yet run on real hardware',
  },
  declarative: {
    value: 'TOML flows + chained argv',
    wins: true,
    note: 'a pull request shows "click submit", not arithmetic',
  },
  languages: {
    value: 'Any — JSON line protocol, or MCP',
    wins: true,
    note: 'a 40-line stdlib Python client ships in the docs; an MCP server for models, gated on a flag they cannot pass; no embedded interpreter, ever',
  },
  relocation: {
    value: 'Every target re-located against a fresh capture before acting',
    wins: true,
    note: 'a crop that matches in more than one place stops the run — ambiguity is the test, not distance',
  },
  verification: {
    value: 'Distinguishes executed from verified; exit codes 0/1/2/3',
    wins: true,
  },
  maintenance: { value: `In active development — v${TOOL_VERSION} on crates.io` },
  license: { value: 'MIT, open source', wins: true },
}

export const COMPETITORS: readonly Competitor[] = [
  {
    slug: 'pyautogui',
    name: 'PyAutoGUI',
    url: 'https://pyautogui.readthedocs.io',
    verifiedAgainst: { version: '0.9.54', date: '2026-07-29' },
    cells: {
      price: { value: 'Free', wins: true },
      platforms: {
        value: 'Windows · macOS · Linux (X11)',
        wins: true,
        note: 'no Wayland; primary monitor only',
      },
      declarative: { value: '—' },
      languages: { value: 'Python' },
      relocation: { value: 'locateOnScreen image search, in-script' },
      verification: { value: '—', note: 'click() returns None — no outcome reported' },
      maintenance: { value: 'Last release May 2023' },
      license: { value: 'BSD-3, open source', wins: true },
    },
  },
  {
    slug: 'sikulix',
    name: 'SikuliX',
    url: 'https://sikulix.github.io',
    verifiedAgainst: { version: '2.0.5 (archived March 2026)', date: '2026-07-29' },
    cells: {
      price: { value: 'Free', wins: true },
      platforms: {
        value: 'macOS · Windows · Linux (JVM)',
        wins: true,
        note: 'requires Java; development archived, continued by the OculiX fork',
      },
      declarative: { value: '—', note: 'Jython / JRuby / JavaScript scripts' },
      languages: { value: 'Jython, JRuby, JavaScript — inside its runtime' },
      relocation: { value: 'Continuous visual search across the screen', wins: true },
      verification: { value: 'In-script image matching' },
      maintenance: {
        value: 'Archived upstream March 2026; the OculiX fork continues',
      },
      license: { value: 'MIT, open source', wins: true },
    },
  },
  {
    slug: 'autohotkey',
    name: 'AutoHotkey',
    url: 'https://www.autohotkey.com',
    verifiedAgainst: { version: '2.0.26', date: '2026-07-29' },
    cells: {
      price: { value: 'Free', wins: true },
      platforms: { value: 'Windows only' },
      declarative: { value: '—', note: 'a full scripting language — the opposite trade' },
      languages: { value: 'AutoHotkey, its own language' },
      relocation: { value: 'ImageSearch, in-script' },
      verification: { value: 'ImageSearch / PixelGetColor, in-script' },
      maintenance: { value: 'Active — v2.0.26, May 2026', wins: true },
      license: { value: 'GPLv2, open source', wins: true },
    },
  },
] as const

/** Lookup that guarantees presence — a page referencing a missing slug is a build-time bug. */
export function competitorBySlug(slug: string): Competitor {
  const found = COMPETITORS.find(entry => entry.slug === slug)
  if (found === undefined) throw new Error(`unknown competitor: ${slug}`)
  return found
}
