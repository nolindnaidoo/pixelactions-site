// Canonical site + tool facts. Every page and metadata file reads from here —
// no URL or version string is written twice.
export const SITE_URL = 'https://pixelactions.dev'
export const TOOL_VERSION = '0.1.0'
export const GITHUB_URL = 'https://github.com/nolindnaidoo/pixelactions'
export const CRATES_URL = 'https://crates.io/crates/pixelactions'
export const RELEASES_URL = 'https://github.com/nolindnaidoo/pixelactions/releases'
export const DOCS_BASE_URL = 'https://github.com/nolindnaidoo/pixelactions/blob/main/docs'

export const TAGLINE =
  'Consume human-verified coordinates, perform the interaction, confirm it landed'

// The two canvas colors, mirrored as literals in globals.css (CSS cannot
// read TS). Consumed by the viewport themeColor metas, the ThemeToggle's
// meta sync, and the web manifest — change globals.css and this pair
// together, nowhere else.
export const THEME_COLORS = { light: '#fafafa', dark: '#0a0a0a' } as const
