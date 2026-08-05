// Canonical site + tool facts. Every page and metadata file reads from here —
// no URL or version string is written twice.
export const SITE_URL = 'https://pixelactions.dev'
export const TOOL_VERSION = '0.9.6'
export const GITHUB_URL = 'https://github.com/nolindnaidoo/pixelactions'
export const CRATES_URL = 'https://crates.io/crates/pixelactions'
export const RELEASES_URL = 'https://github.com/nolindnaidoo/pixelactions/releases'
export const DOCS_BASE_URL = 'https://github.com/nolindnaidoo/pixelactions/blob/main/docs'
// The capture half of the loop — the companion tool's site.
export const COMPANION_URL = 'https://pixelcoords.dev'
// The platform-free cores.
export const CORE_URL = 'https://crates.io/crates/pixelactions-core'
export const COMPANION_CORE_URL = 'https://crates.io/crates/pixelcoords-core'
// The maker's VS Code extension family hub (letools.dev) — reciprocal link.
export const LETOOLS_URL = 'https://letools.dev'

export const TAGLINE =
  'Consume human-verified coordinates, perform the interaction, confirm it landed'

// The two canvas colors, mirrored as literals in globals.css (CSS cannot
// read TS). Consumed by the viewport themeColor metas, the ThemeToggle's
// meta sync, and the web manifest — change globals.css and this pair
// together, nowhere else.
export const THEME_COLORS = { light: '#fafafa', dark: '#0a0a0a' } as const
